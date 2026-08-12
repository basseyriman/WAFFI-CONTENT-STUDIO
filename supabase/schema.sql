-- Run this in the Supabase SQL editor for project gyegrjzuhadjrxaeelxy

create table if not exists public.booking_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  shoot_date date,
  space_slug text,
  rental_ids text[] not null default '{}',
  message text not null,
  inquiry_type text not null default 'general' check (inquiry_type in ('space', 'rental', 'both', 'general')),
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'closed'))
);

alter table public.booking_inquiries enable row level security;

create policy "Allow public inserts on booking_inquiries"
  on public.booking_inquiries
  for insert
  to anon, authenticated
  with check (true);

create policy "Deny public reads on booking_inquiries"
  on public.booking_inquiries
  for select
  to anon
  using (false);
