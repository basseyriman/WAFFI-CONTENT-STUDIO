# WAFFI Content Studio

Premium multi-set content studio website for **WAFFI Content Studio** — book curated partitions and rent shoot essentials.

## Features

- 15 named studio spaces with generated placeholder photography
- Dark / light mode
- Rental catalog for lighting, audio, props, furniture, and backdrops
- Booking inquiry form (space + rentals)
- Supabase-ready booking persistence
- Directory totem print pack in `designs/totem/print-pack`

## Studio pet names

| Partition | Pet name |
|---|---|
| Traditional | Waffi Heritage |
| Maternity / Kids | Waffi Drape |
| White Themed | Waffi Cloud |
| Rose Themed | Waffi Rose |
| Makeup Studio | Waffi Glam |
| Staircase | Waffi Steps |
| Bedroom | Waffi Suite |
| Games Room / Bar | Waffi Socials |
| Office | Waffi Desk |
| Podcast | Waffi Voice |
| Kitchen | Waffi Spice |
| Backdrop Studio | Waffi Backdrop |
| Lounge / Sitting Room | Waffi Lounge |
| Hallway | Waffi Passage |
| Balcony | Waffi Balcony |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Totem print pack

```bash
node scripts/export-totem-print-pack.mjs
```

Outputs to `designs/totem/print-pack` and `Desktop/WAFFI-Totem-Print-Pack`.

## Supabase setup

1. Open [the project dashboard](https://supabase.com/dashboard/project/gyegrjzuhadjrxaeelxy)
2. Run `supabase/schema.sql` in the SQL editor
3. Copy `.env.example` to `.env.local` and add your anon key

## Replace studio photos later

Generated images live in `public/spaces/` and `public/brand/`. When real studio photographs are ready, replace files using the same filenames (or update paths in `src/lib/spaces.ts`).
