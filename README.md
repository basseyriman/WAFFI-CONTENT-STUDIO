# WAFFI Content Studio

Premium multi-set content studio website for **WAFFI Content Studio** — book curated partitions and rent shoot essentials.

## Features

- 15 named studio spaces with generated placeholder photography
- Dark / light mode
- Rental catalog for lighting, audio, props, furniture, and backdrops
- Booking inquiry form (space + rentals)
- Supabase-ready booking persistence

## Studio pet names

| Partition | Pet name |
|---|---|
| Traditional | Waffi Heritage |
| Maternity / kids | Waffi Nest |
| White themed | Waffi Ivory |
| Rose themed | Waffi Blush |
| Makeup studio | Waffi Glam |
| Staircase | Waffi Ascent |
| Bedroom | Waffi Suite |
| Games room / Bar | Waffi Social |
| Office | Waffi Desk |
| Podcast | Waffi Echo |
| Kitchen | Waffi Hearth |
| Backdrop studio | Waffi Canvas |
| Lounge / sitting | Waffi Lounge |
| Hallway | Waffi Passage |
| Balcony | Waffi Terrace |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

1. Open [the project dashboard](https://supabase.com/dashboard/project/gyegrjzuhadjrxaeelxy)
2. Run `supabase/schema.sql` in the SQL editor
3. Copy `.env.example` to `.env.local` and add your anon key

Without env vars, booking inquiries still succeed and are logged server-side.

## Replace studio photos later

Generated images live in `public/spaces/` and `public/brand/`. When real studio photographs are ready, replace files using the same filenames (or update paths in `src/lib/spaces.ts`).

## Deploy

Designed for Vercel. Set the same `NEXT_PUBLIC_SUPABASE_*` environment variables in the hosting project.
