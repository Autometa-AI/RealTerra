-- RealTerra CMS — run this once in the Supabase SQL Editor
-- (Project → SQL Editor → New query → paste → Run).

create table if not exists cms_content (
  page text primary key,
  content jsonb not null,
  updated_by text,
  updated_at timestamptz not null default now()
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  interest text,
  budget text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Public bucket for CMS-uploaded images (served directly via public URL,
-- no signed URLs needed). All writes go through the server using the
-- service role key, so no additional storage policies are required.
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- The app talks to these tables exclusively through the Supabase
-- service role key from server-side code, which bypasses RLS by design.
-- Row Level Security stays enabled with no public policies, so the
-- anon/publishable key (if ever used) has no access.
alter table cms_content enable row level security;
alter table contact_submissions enable row level security;
alter table newsletter_subscribers enable row level security;

-- Added 2026-08: project detail pages carry their own enquiry form, so a
-- submission records which project it came from. Null means it came from
-- the general contact page.
alter table contact_submissions add column if not exists project text;
