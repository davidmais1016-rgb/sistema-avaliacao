-- Execute no SQL Editor do seu projeto Supabase.
create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  product_quality int not null check (product_quality between 1 and 5),
  taste_presentation int not null check (taste_presentation between 1 and 5),
  service int not null check (service between 1 and 5),
  waiting_time int not null check (waiting_time between 1 and 5),
  overall int not null check (overall between 1 and 5),
  flavor text not null,
  comment text,
  contact text,
  recommend boolean not null
);

alter table public.reviews enable row level security;

-- Clientes podem enviar avaliações, mas nunca ler, editar ou apagar avaliações.
drop policy if exists "public can submit reviews" on public.reviews;
create policy "public can submit reviews"
on public.reviews for insert
to anon, authenticated
with check (
  product_quality between 1 and 5 and
  taste_presentation between 1 and 5 and
  service between 1 and 5 and
  waiting_time between 1 and 5 and
  overall between 1 and 5 and
  length(flavor) between 1 and 80 and
  (comment is null or length(comment) <= 1000) and
  (contact is null or length(contact) <= 120)
);

-- Somente usuário autenticado pode consultar. Crie apenas a sua conta
-- em Authentication > Users e desative o cadastro público.
drop policy if exists "authenticated admin can read reviews" on public.reviews;
create policy "authenticated admin can read reviews"
on public.reviews for select
to authenticated
using (auth.uid() is not null);

grant usage on schema public to anon, authenticated;
grant insert on public.reviews to anon, authenticated;
grant select on public.reviews to authenticated;
