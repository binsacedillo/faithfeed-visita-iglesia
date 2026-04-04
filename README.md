# Faith Feed: Visita Iglesia 2026

Faith Feed is a meditative Next.js PWA for Catholic devotional practice. It started as a Holy Week companion and now supports seasonal presentation beyond Easter.

## Key Features

- 7-Church Visita Iglesia devotional flow with station-based reflections.
- St. Alphonsus Stations of the Cross content with scripture, prayers, and guided consideration.
- Date-aware liturgy cards for Holy Thursday, Good Friday, Holy Saturday, Easter, Easter Season, and Ordinary Time presentation.
- PWA support (installable, offline-capable shell) via Serwist service worker.
- Season-aware visual themes, including Easter and Ordinary Time palettes.
- Resilience improvements for deployment: no-store API fetch behavior and feed fallback cards when API data is temporarily unavailable.

## Season Logic (Current)

- Holy Week detection: Thursday, Friday, Saturday before Easter Sunday.
- Easter Sunday: dedicated Easter view.
- Easter Season: Easter Monday through Pentecost.
- Ordinary Time (current implementation): starts the day after Pentecost through year end.

## Background Personalization

Add your own sacred images in `public/backgrounds/`.

Suggested file names:
- `header.jpeg` for the opening guide.
- `intro.jpg` for general intro cards.
- `station1.jpg` to `station7.jpg` for Visita Iglesia stations.
- `outro.jpg` for closing/ending cards.

Additional seasonal assets currently used by the UI include:
- `easterheader.jpg`, `easter.jpg`
- `headerthursday.jpeg`, `fridayheader.jpg`, `saturdayheader.jpg`
- `thursday.jpg`, `friday.jpg`, `saturday.jpg`

## Tech Stack

- Next.js 15 (App Router)
- React 19
- tRPC 11
- Prisma ORM
- SQLite (current production setup)
- Serwist (PWA service worker)
- TypeScript + Vanilla CSS modules

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma client and seed data if needed:
```bash
npm run db:push
npx prisma db seed
```

3. Run dev server:
```bash
npm run dev
```

4. Validate types:
```bash
npm run typecheck
```

## Deployment Notes

- API route is configured for dynamic Node.js runtime behavior.
- Client tRPC fetch is configured with `cache: no-store` to reduce stale responses.
- UI includes fallback devotional cards and retry behavior if API query fails.
- For stronger production reliability at scale, consider moving from file-based SQLite to a managed database.

## Maker

Designed and built by Vince Gio Acedillo.

## License

Copyright 2026 Vince Gio Acedillo. All rights reserved.
