// Service worker for the Peter & Ellie speech app.
// Network-first for the speech page (edits show up when online),
// cache fallback for offline. Non-speech requests pass straight through.
const CACHE = 'peter-speech-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (!(url.pathname.endsWith('/peter.html') || url.pathname.endsWith('/peter'))) return;
  e.respondWith((async () => {
    try {
      const net = await Promise.race([
        fetch(e.request, { cache: 'no-store' }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 3500))
      ]);
      const cache = await caches.open(CACHE);
      cache.put(e.request, net.clone());
      return net;
    } catch (err) {
      return (await caches.match(e.request)) || Response.error();
    }
  })());
});
