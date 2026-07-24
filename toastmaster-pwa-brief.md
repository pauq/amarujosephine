# Toastmaster PWA — brief och innehåll

Underlag för att låta en AI generera en progressive web app. Innehåller kravspec och all text som kort.

Bröllopet: lördag, middag 17.00–22.00. Toastmaster: Paul. Brudpar: Josephine & Amaru.

---

## Kravspec

Bygg en offline-first progressive web app med två vyer: **kortvyn** (swipebart manus) och **schemavyn** (redigerbar tidsplan).

### Generellt

- Måste fungera helt offline efter första laddningen (service worker, allt innehåll inbakat — inga externa anrop).
- Installerbar på hemskärmen (manifest.json, ikoner, `display: standalone`).
- Mörkt tema. Ljus text på mörk bakgrund — telefonen används i en dunkel festlokal och skärmen ska inte blända.
- Stor, läsbar typografi. Manustexten ska gå att läsa på armlängds avstånd i dålig belysning. Minst 20px brödtext, gärna större.
- Skärmen ska inte släckas under användning (Wake Lock API, tyst fallback om det inte stöds).
- Växling mellan de två vyerna via en tydlig men diskret flik/knapp som alltid är nåbar.

### Kortvyn

- Ett kort i taget, fullskärm. Swipe vänster/höger, samt pilar och tangentbord (←/→).
- Positionsindikator ("7 / 24") synlig men diskret.
- Varje kort visar `time` (planerad tid) som liten etikett i hörnet, `label` som rubrik, och `text` som huvudinnehåll.
- Tiden som visas ska hämtas från schemavyns data, så att en ändring där slår igenom här.
- Kortets `type` styr utseendet:
  - `script` — manus att läsa upp. Störst text, högsta kontrast.
  - `cue` — regianvisning, inget att säga högt. Dämpad färg, mindre text, tydligt annorlunda så det inte råkar läsas upp i mikrofonen.
  - `break` — paus/servering. Egen accentfärg.
- Kort med `note` visar den som liten fotnot i botten, visuellt skild från manustexten.
- Radbrytningar i `text` ska respekteras (dikten på kort 3 har fyra rader).
- Appen ska komma ihåg vilket kort man var på om telefonen låser sig eller appen stängs (localStorage).

### Schemavyn

- Lista över alla poster med tid till vänster och beskrivning till höger, i kronologisk ordning.
- **Varje tid ska gå att redigera direkt i listan** — tryck på tiden, skriv en ny, klart. Ändringar sparas i localStorage och överlever omladdning.
- Aktuell post markeras baserat på klockslag, så man ser var man borde vara just nu.
- Visa hur mycket man ligger före eller efter schemat: jämför nuvarande korts planerade tid med faktisk klocka och visa t.ex. "8 min efter schemat".
- Tryck på en rad hoppar till motsvarande kort i kortvyn.
- Knapp för att återställa alla tider till ursprungsvärdena.
- Längst ned i schemavyn: en alltid synlig ruta med strykordningen (se referensinfo).

---

## Kortdata

```json
{
  "title": "Toastmaster — Josephine & Amaru",
  "cards": [
    {
      "id": 1,
      "type": "cue",
      "time": "17.00",
      "label": "Innan du börjar",
      "text": "Vänta tills alla sitter. Fånga blicken hos brudparet. Andas ut. Din totala taltid ikväll är elva minuter — du har gott om tid."
    },
    {
      "id": 2,
      "type": "script",
      "time": "17.05",
      "label": "1 — Öppning + välkomstskål",
      "text": "Ladies and gentlemen — this is your toastmaster speaking. My name is Paul. We have a turbulent evening ahead of us, with a flight time of around four hours. The weather at the destination is the same as here: glorious. The in-flight entertainment system is packed to the brim — emotional dramas, game shows, musicals, and at least one documentary I have not been allowed to preview. Bathrooms are at the entrance, life vests are under your seats, and remember to wipe your own tears before assisting the person next to you. Let's raise a glass before we begin. To the gorgeous couple — Amaru and Josephine!",
      "note": "Lägg in praktisk info här om det behövs. Höj glaset tydligt så rummet följer med."
    },
    {
      "id": 3,
      "type": "script",
      "time": "17.10",
      "label": "2 — Mette + Morten, tal",
      "text": "They gave her wings so she could fly,\nand love to reach the open sky.\nA root to hold along the way,\nfrom first steps to her wedding day.\n\nThe first speakers of the evening are Josephine's lookalikes — I mean parents — Mette and Morten!",
      "note": "Läs dikten långsamt. Paus före sista raden."
    },
    {
      "id": 4,
      "type": "break",
      "time": "17.20",
      "label": "Förrätten serveras",
      "text": "Cirka 30 minuter. Ingen programpunkt.",
      "note": "Stäm av med köket att varmrätten ligger i fas."
    },
    {
      "id": 5,
      "type": "script",
      "time": "17.50",
      "label": "3 — Amaru, brudgummens tal",
      "text": "Our next speaker is my best friend in the world. As a ten-year-old I proudly walked onto the schoolyard of my new school with a bag full of glass marbles — only to find out that at this school you were supposed to play Pokémon on a Gameboy. Amaru was the one who put his Gameboy aside, said hi, and took me under his wing. In 2016 I was demoted to second place after Josephine, and in 2022 I dropped to third when Mumrik joined the family. But you're still at the top of my list. Ladies and gentlemen — the groom!",
      "note": "Säg inte hans namn för tidigt. Rummet ska tro att det är en kompis."
    },
    {
      "id": 6,
      "type": "cue",
      "time": "17.58",
      "label": "Andas",
      "text": "Låt applåderna klinga ut helt innan du fortsätter. Amarus föräldrar ska inte behöva följa direkt på hans tal — ge dem tio sekunders tystnad."
    },
    {
      "id": 7,
      "type": "script",
      "time": "18.00",
      "label": "4 — Katarina + Salustio, tal",
      "text": "In my head I spent as much time in Amaru's kitchen as I did in my own. That can't be true — but that's how I remember it. In the Cuba Gyllensten household you were never treated as a guest. The table just got longer. The next speakers formed Amaru into the person he is today — and honestly had a big hand in shaping me too. Please welcome the most welcoming people I know — Katarina and Salustio!"
    },
    {
      "id": 8,
      "type": "break",
      "time": "18.05",
      "label": "Andrum",
      "text": "Cirka 25 minuter. Folk äter, pratar, går på toa.",
      "note": "Se till att champagne och glas är framme inför nästa punkt."
    },
    {
      "id": 9,
      "type": "script",
      "time": "18.30",
      "label": "5 — Anne-Marie + Signe, medley del 1",
      "text": "The seatbelt sign is now on. What follows is a musical number in three parts, which means it will be interrupting your meal at regular intervals for the rest of the flight. Cabin crew, prepare champagne. Anne-Marie and Signe!",
      "note": "Champagnen. Kontrollera att flaskorna är framme innan du börjar prata."
    },
    {
      "id": 10,
      "type": "script",
      "time": "18.40",
      "label": "6 — Severin, quiz",
      "text": "Our next speaker is a childhood friend of Amaru's, and a qualified psychologist. He has prepared a scientific compatibility assessment. It has not been peer reviewed. I'm told that's not required at a wedding. Josephine, Amaru: you are the subjects. There is no control group and there is no right of appeal. Severin!",
      "note": "Cirka 10 min. Severin sköter allt själv — gå undan."
    },
    {
      "id": 11,
      "type": "break",
      "time": "18.55",
      "label": "Andrum",
      "text": "Cirka 20 minuter."
    },
    {
      "id": 12,
      "type": "script",
      "time": "19.15",
      "label": "7 — Anne-Marie + Signe, medley del 2",
      "text": "We're now passing through the second band of turbulence. Please remain seated. Anne-Marie and Signe, part two!",
      "note": "Varmrätten serveras under. Detta är första strykningen om ni ligger efter."
    },
    {
      "id": 13,
      "type": "break",
      "time": "19.45",
      "label": "Ät i lugn och ro",
      "text": "Cirka 20 minuter utan program."
    },
    {
      "id": 14,
      "type": "script",
      "time": "20.05",
      "label": "8 — Richard + Jaana, presentation",
      "text": "For the next segment — I've commissioned a team with long-standing careers in psychology and communications to analyse and present Amaru and Josephine's relationship in a visual format. Consider it a second opinion. Please give it up for Richard and Jaana!",
      "note": "Måste komma efter Severin — \"second opinion\" hänger på det."
    },
    {
      "id": 15,
      "type": "script",
      "time": "20.15",
      "label": "9 — Anne-Marie + Signe, medley del 3",
      "text": "Third and final instalment. And this time it's for everybody — you don't need to be good, you need to be loud. Anne-Marie and Signe!",
      "note": "OBS: inte längre finalen. Ingen \"final descent\" här — den repliken hör hemma i slutskålen."
    },
    {
      "id": 16,
      "type": "break",
      "time": "20.25",
      "label": "Andrum",
      "text": "Cirka 25 minuter. Tallrikar ut.",
      "note": "Skål till föräldrarna och tack till köket ca 20.35 — se nästa kort."
    },
    {
      "id": 17,
      "type": "script",
      "time": "20.35",
      "label": "Skål till föräldrarna + tack till köket",
      "text": "Improvisera kort. Höj ett glas för båda föräldraparen, tacka köket och personalen vid namn om du kan.",
      "note": "Cirka en minut. Sedan tillbaka till andrum."
    },
    {
      "id": 18,
      "type": "script",
      "time": "20.50",
      "label": "10 — Svensexefilmen",
      "text": "You can't just let a man get married. There are procedures. Regulations. This is the documentary — a world premiere, never shown before and never to be shown again. A film by Severin.",
      "note": "Cirka 6 min. Kolla att uppspelningen fungerar innan du säger något."
    },
    {
      "id": 19,
      "type": "script",
      "time": "21.00",
      "label": "11 — Ollanta + Karin, tal",
      "text": "As a ten-year-old, Amaru's brothers were the coolest people in the world — and sort of intimidating. I'm not going to lie, I'm a little bit starstruck here tonight. Our next speaker has been Amaru's older brother, then roommate, then neighbour, then brother again. I'm starting to realize he might be ahead of me in the Best Friend competition — that's me down to fourth. Welcome to the stage — Ollanta, and his lovely wife Karin!",
      "note": "Desserten serveras nu."
    },
    {
      "id": 20,
      "type": "script",
      "time": "21.10",
      "label": "12 — Illapha, tal",
      "text": "And now — the eldest son of House Cuba Gyllensten, first of his name, rightful heir to the Peruvian-Swedish throne, protector of the realm, and yet another contender for best friend. I'm now at fifth place. Illapha!",
      "note": "Leverera titlarna med pompa."
    },
    {
      "id": 21,
      "type": "break",
      "time": "21.20",
      "label": "Kaffe, kort paus",
      "text": "Cirka 15 minuter. Folk rör på sig."
    },
    {
      "id": 22,
      "type": "script",
      "time": "21.35",
      "label": "13 — Mathias, tal",
      "text": "When our friend group first met Josephine, a number of us were terrified. She was a cool kid, and we were... trying our best. But underneath all that effortless cool, she's the warmest, most laid-back and loyal friend you could ask for. We haven't made her any less cool — though I'd like to think a little of it rubbed off on us.\n\nOur next speaker knew her long before any of that. A witness to the awkward years. Her brother — Mathias!",
      "note": "Pausen efter \"and we were...\" är hela skämtet. Ta den."
    },
    {
      "id": 23,
      "type": "script",
      "time": "21.45",
      "label": "14 — Mette + Morten, sång",
      "text": "We began this evening with Mette and Morten, and they've asked for one more moment — though not in speech form this time. Mette and Morten."
    },
    {
      "id": 24,
      "type": "script",
      "time": "21.55",
      "label": "15 — Slutskål",
      "text": "That's the last of them. And if we include Jaana, Richard and Severin as claimants, I'm down to eighth. I'd like to stop before I leave the list entirely. Ladies and gentlemen, we have begun our final descent — and we have arrived. On behalf of the entire crew, thank you for flying with Josephine and Amaru. Raise your glasses — to the two of them. The bar is open, and the floor is yours.",
      "note": "Håll den kort. DJ:n startar direkt efter."
    },
    {
      "id": 25,
      "type": "cue",
      "time": "22.00",
      "label": "Klart",
      "text": "Dansgolvet öppnar. Ditt jobb är gjort. Ta ett glas."
    }
  ]
}
```

---

## Referensinfo för den som bygger

**Nedräkningen "best friend"** löper genom kvällen och siffrorna måste stämma: 1:a → 2:a (Josephine, 2016) → 3:e (Mumrik, 2022) → 4:e (Ollanta) → 5:e (Illapha) → 8:e (slutskålen). Ändras ordningen måste siffrorna räknas om.

**Flygtemat** finns i kort 2, 9, 12 och 24. Övriga introduktioner är medvetet raka och varma — det är inte en miss.

**Strykordning vid tidsbrist** (visas i schemavyn):

1. Uppgångslåtarna
2. Medley del 2 (kort 12)
3. Richard och Jaanas presentation (kort 14)
4. Filmen (kort 18) flyttas till minglet efter middagen

**Tiderna är preliminära.** Serveringstiderna är kontaktpersonens uppskattning, inte ett löfte — därför måste schemavyn gå att redigera på plats.
