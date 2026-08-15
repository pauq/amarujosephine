// Service worker for the Jaana & Patryk speech app.
// Network-first for the speech page so edits always show when online,
// with a cache fallback so it still works offline at the venue.
// Everything that isn't jaana.html is passed straight through untouched.
const CACHE = 'jaana-speech-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isSpeech = url.pathname.endsWith('/jaana.html') || url.pathname.endsWith('/jaana');
  if (!isSpeech) return; // let all other pages behave normally

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
      const cached = await caches.match(e.request);
      return cached || Response.error();
    }
  })());
});
