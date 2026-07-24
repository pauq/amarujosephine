# Toastmaster PWA — brief och innehåll

Underlag för att låta en AI generera en progressive web app. Innehåller kravspec och all text som kort.

---

## Kravspec

Bygg en offline-first progressive web app som visar swipebara kort för en toastmaster under en bröllopsmiddag.

**Krav**

- Ett kort i taget, fullskärm, swipe vänster/höger mellan kort. Pilar och tangentbord (←/→) ska också fungera.
- Måste fungera helt offline efter första laddningen (service worker, allt innehåll inbakat i appen — inga externa anrop).
- Installerbar på hemskärmen (manifest.json, ikoner, `display: standalone`).
- Mörkt tema. Ljus text på mörk bakgrund — telefonen kommer att användas i en dunkel festlokal och skärmen ska inte blända.
- Stor, läsbar typografi. Manustexten ska gå att läsa på en armlängds avstånd i dålig belysning. Minst 20px brödtext, gärna större.
- Skärmen ska inte släckas under användning (Wake Lock API, med tyst fallback om det inte stöds).
- Positionsindikator ("7 / 21") synlig men diskret.
- Kortets `type` styr utseendet:
  - `script` — manus att läsa upp. Störst text, högsta kontrast.
  - `cue` — regianvisning, inget att säga högt. Dämpad färg, mindre text, tydligt annorlunda så det inte råkar läsas upp.
  - `break` — paus/servering. Egen accentfärg.
- Varje kort har ett `label` (vem/vad) som visas som liten rubrik ovanför innehållet.
- Kort med `note` visar den som en liten fotnot i botten, visuellt skild från manustexten.
- Radbrytningar i `text` ska respekteras (dikten på kort 3 har fyra rader).
- Bonus: en diskret meny som listar alla kort så man kan hoppa direkt till ett; ett litet "sparat läge" så appen öppnar på samma kort om telefonen låser sig.

**Innehållet ligger i `cards` nedan. Rör inte texten — den ska återges ordagrant.**

---

## Kortdata

```json
{
  "title": "Toastmaster — Josephine & Amaru",
  "cards": [
    {
      "id": 1,
      "type": "cue",
      "label": "Innan du börjar",
      "text": "Vänta tills alla sitter. Fånga blicken hos brudparet. Andas ut. Din totala taltid ikväll är elva minuter — du har gott om tid."
    },
    {
      "id": 2,
      "type": "script",
      "label": "1 — Öppning + välkomstskål",
      "text": "Ladies and gentlemen — this is your toastmaster speaking. My name is Paul. We have a turbulent evening ahead of us, with a flight time of around four hours. The weather at the destination is the same as here: glorious. The in-flight entertainment system is packed to the brim — emotional dramas, game shows, musicals, and at least one documentary I have not been allowed to preview. Bathrooms are at the entrance, life vests are under your seats, and remember to wipe your own tears before assisting the person next to you. Let's raise a glass before we begin. To the gorgeous couple — Amaru and Josephine!",
      "note": "Lägg in praktisk info här om det behövs. Höj glaset tydligt så rummet följer med."
    },
    {
      "id": 3,
      "type": "script",
      "label": "2 — Mette + Morten, tal",
      "text": "They gave her wings so she could fly,\nand love to reach the open sky.\nA root to hold along the way,\nfrom first steps to her wedding day.\n\nThe first speakers of the evening are Josephine's lookalikes — I mean parents — Mette and Morten!",
      "note": "Läs dikten långsamt. Paus före sista raden."
    },
    {
      "id": 4,
      "type": "break",
      "label": "Paus",
      "text": "Förrätten serveras. Cirka 10 minuter.",
      "note": "Stäm av med köket att varmrätten ligger i fas."
    },
    {
      "id": 5,
      "type": "script",
      "label": "3 — Amaru, brudgummens tal",
      "text": "Our next speaker is my best friend in the world. As a ten-year-old I proudly walked onto the schoolyard of my new school with a bag full of glass marbles — only to find out that at this school you were supposed to play Pokémon on a Gameboy. Amaru was the one who put his Gameboy aside, said hi, and took me under his wing. In 2016 I was demoted to second place after Josephine, and in 2022 I dropped to third when Mumrik joined the family. But you're still at the top of my list. Ladies and gentlemen — the groom!",
      "note": "Säg inte hans namn för tidigt. Rummet ska tro att det är en kompis."
    },
    {
      "id": 6,
      "type": "script",
      "label": "4 — Anne-Marie + Signe, medley del 1",
      "text": "The seatbelt sign is now on. What follows is a musical number in three parts, which means it will be interrupting your meal at regular intervals for the rest of the flight. Cabin crew, prepare champagne. Anne-Marie and Signe!",
      "note": "Champagnen — se till att flaskor och glas är framme innan du börjar prata."
    },
    {
      "id": 7,
      "type": "break",
      "label": "Andrum",
      "text": "Cirka 10 minuter. Folk äter och pratar."
    },
    {
      "id": 8,
      "type": "script",
      "label": "5 — Katarina + Salustio, tal",
      "text": "In my head I spent as much time in Amaru's kitchen as I did in my own. That can't be true — but that's how I remember it. In the Cuba Gyllensten household you were never treated as a guest. The table just got longer. The next speakers formed Amaru into the person he is today — and honestly had a big hand in shaping me too. Please welcome the most welcoming people I know — Katarina and Salustio!"
    },
    {
      "id": 9,
      "type": "break",
      "label": "Andrum",
      "text": "Cirka 10 minuter."
    },
    {
      "id": 10,
      "type": "script",
      "label": "6 — Anne-Marie + Signe, medley del 2",
      "text": "We're now passing through the second band of turbulence. Please remain seated. Anne-Marie and Signe, part two!",
      "note": "Varmrätten serveras under. Detta är första strykningen om ni ligger efter."
    },
    {
      "id": 11,
      "type": "break",
      "label": "Ät i lugn och ro",
      "text": "Låt gästerna äta ostört en stund."
    },
    {
      "id": 12,
      "type": "script",
      "label": "7 — Severin, quiz",
      "text": "Our next speaker is a childhood friend of Amaru's, and a qualified psychologist. He has prepared a scientific compatibility assessment. It has not been peer reviewed. I'm told that's not required at a wedding. Josephine, Amaru: you are the subjects. There is no control group and there is no right of appeal. Severin!",
      "note": "Cirka 10 min. Severin sköter allt själv — gå undan."
    },
    {
      "id": 13,
      "type": "script",
      "label": "8 — Richard + Jaana, presentation",
      "text": "For the next segment — I've commissioned a team with long-standing careers in psychology and communications to analyse and present Amaru and Josephine's relationship in a visual format. Consider it a second opinion. Please give it up for Richard and Jaana!",
      "note": "Måste komma efter Severin — \"second opinion\" hänger på det."
    },
    {
      "id": 14,
      "type": "script",
      "label": "Skål till föräldrarna + tack till köket",
      "text": "Improvisera kort. Höj ett glas för båda föräldraparen, tacka köket och personalen vid namn om du kan.",
      "note": "Cirka en minut. Sedan andrum, cirka 10 min."
    },
    {
      "id": 15,
      "type": "script",
      "label": "9 — Ollanta + Karin, tal",
      "text": "As a ten-year-old, Amaru's brothers were the coolest people in the world — and sort of intimidating. I'm not going to lie, I'm a little bit starstruck here tonight. Our next speaker has been Amaru's older brother, then roommate, then neighbour, then brother again. I'm starting to realize he might be ahead of me in the Best Friend competition — that's me down to fourth. Welcome to the stage — Ollanta, and his lovely wife Karin!"
    },
    {
      "id": 16,
      "type": "script",
      "label": "10 — Illapha, tal",
      "text": "And now — the eldest son of House Cuba Gyllensten, first of his name, rightful heir to the Peruvian-Swedish throne, protector of the realm, and yet another contender for best friend. I'm now at fifth place. Illapha!",
      "note": "Leverera titlarna med pompa. Sedan tallrikar ut."
    },
    {
      "id": 17,
      "type": "script",
      "label": "11 — Mathias, tal",
      "text": "When our friend group first met Josephine, a number of us were terrified. She was a cool kid, and we were... trying our best. But underneath all that effortless cool, she's the warmest, most laid-back and loyal friend you could ask for. We haven't made her any less cool — though I'd like to think a little of it rubbed off on us.\n\nOur next speaker knew her long before any of that. A witness to the awkward years. Her brother — Mathias!",
      "note": "Pausen efter \"and we were...\" är hela skämtet. Ta den."
    },
    {
      "id": 18,
      "type": "script",
      "label": "12 — Mette + Morten, sång",
      "text": "We began this evening with Mette and Morten, and they've asked for one more moment — though not in speech form this time. Mette and Morten."
    },
    {
      "id": 19,
      "type": "break",
      "label": "Paus",
      "text": "Cirka 10 minuter. Kaffe, folk rör på sig."
    },
    {
      "id": 20,
      "type": "script",
      "label": "13 — Svensexefilmen",
      "text": "You can't just let a man get married. There are procedures. Regulations. This is the documentary — a world premiere, never shown before and never to be shown again. A film by Severin.",
      "note": "Cirka 6 min. Kolla att uppspelningen fungerar innan du säger något."
    },
    {
      "id": 21,
      "type": "script",
      "label": "14 — Anne-Marie + Signe, medley del 3 (allsång)",
      "text": "We have begun our final descent. Please return your seat backs to the upright position — and this time, everybody sings. You don't need to be good. You need to be loud. Anne-Marie and Signe!"
    },
    {
      "id": 22,
      "type": "script",
      "label": "15 — Slutskål",
      "text": "That's the last of them. And if we include Jaana, Richard and Severin as claimants, I'm down to eighth. I'd like to stop before I leave the list entirely. Ladies and gentlemen, we have arrived. On behalf of the entire crew, thank you for flying with Josephine and Amaru. Raise your glasses — to the two of them. The bar is open, and the floor is yours.",
      "note": "Håll den kort. DJ:n startar direkt efter."
    },
    {
      "id": 23,
      "type": "cue",
      "label": "Klart",
      "text": "Dansgolvet öppnar. Ditt jobb är gjort. Ta ett glas."
    }
  ]
}
```

---

## Referensinfo för den som bygger

**Nedräkningen "best friend"** löper genom kvällen och siffrorna måste stämma: 1:a → 2:a (Josephine, 2016) → 3:e (Mumrik, 2022) → 4:e (Ollanta) → 5:e (Illapha) → 8:e (slutskålen). Ändras ordningen måste siffrorna räknas om.

**Flygtemat** finns i kort 2, 6, 10, 21 och 22. Övriga introduktioner är medvetet raka och varma — det är inte en miss.

**Strykordning vid tidsbrist:** uppgångslåtarna → medley del 2 (kort 10) → Richard/Jaanas presentation (kort 13) → filmen (kort 20) flyttas till minglet.
