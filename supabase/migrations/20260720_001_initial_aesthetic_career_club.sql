create extension if not exists pgcrypto;

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  anonymous_token text not null unique,
  current_brand text not null default 'Aesthetic Career Club',
  role text not null,
  role_track text not null,
  personally_performs_procedures text not null,
  supervises_clinicians text not null,
  ownership_status text not null,
  primary_state text not null,
  practices_in_massachusetts text not null,
  practices_in_multiple_states text not null,
  active_states text[] not null default '{}',
  region text not null,
  aesthetics_experience text not null,
  healthcare_experience text not null,
  workplace_type text not null,
  employer_location_count text not null,
  primary_license text not null,
  additional_licenses text[] not null default '{}',
  massachusetts_license_active text not null,
  prescriptive_authority text not null,
  board_certified text not null,
  board_certification_type text,
  independent_assessment text not null,
  independent_prescribing text,
  treatment_plan_signoff_required text not null,
  prescribing_signoff_required text,
  works_under_medical_director text not null,
  is_medical_director text not null,
  injector_status text,
  laser_under_own_license text,
  license_arrangement text not null,
  advanced_training text[] not null default '{}',
  device_certifications text[] not null default '{}',
  employment_arrangement text not null,
  weekly_hours text not null,
  employer_tenure text not null,
  restrictive_agreement text not null,
  compensation_structure text not null,
  hourly_rate numeric(10,2),
  annual_salary numeric(12,2),
  receives_commission text not null,
  commission_type text,
  commission_value text,
  total_annual_earnings_range text not null,
  benefits text[] not null default '{}',
  services_performed text[] not null default '{}',
  injectable_volume_range text not null,
  monthly_revenue_range text not null,
  brings_patient_following text not null,
  requested_patient_percentage_range text not null,
  sales_expectation text not null,
  compensation_fairness_score integer not null check (compensation_fairness_score between 1 and 10),
  job_mobility text not null,
  reasons_to_leave text[] not null default '{}',
  compensation_frustration text not null default '',
  employer_retention_feedback text not null default '',
  consented boolean not null default false,
  is_test_response boolean not null default false,
  is_invalid boolean not null default false,
  invalidated_at timestamptz,
  invalidation_reason text,
  created_at timestamptz not null default now(),
  completed_at timestamptz not null,
  referrer_code text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  landing_page_variant text
);

create index if not exists survey_responses_completed_at_idx
  on public.survey_responses (completed_at desc);

create index if not exists survey_responses_role_idx
  on public.survey_responses (role);

create index if not exists survey_responses_region_idx
  on public.survey_responses (region);

create index if not exists survey_responses_primary_state_idx
  on public.survey_responses (primary_state);

create index if not exists survey_responses_utm_source_idx
  on public.survey_responses (utm_source);

create table if not exists public.report_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  anonymous_response_token text,
  consented_to_email boolean not null default false,
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  referrer_code text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page_variant text
);

create index if not exists report_subscribers_created_at_idx
  on public.report_subscribers (created_at desc);

create index if not exists report_subscribers_utm_source_idx
  on public.report_subscribers (utm_source);

create table if not exists public.referral_events (
  id uuid primary key default gen_random_uuid(),
  referrer_code text not null,
  referred_response_token text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists referral_events_referrer_code_idx
  on public.referral_events (referrer_code);

alter table public.survey_responses enable row level security;
alter table public.report_subscribers enable row level security;
alter table public.referral_events enable row level security;

create policy "survey_responses_insert_public"
  on public.survey_responses
  for insert
  to anon, authenticated
  with check (consented = true);

create policy "report_subscribers_insert_public"
  on public.report_subscribers
  for insert
  to anon, authenticated
  with check (consented_to_email = true);

create policy "referral_events_insert_public"
  on public.referral_events
  for insert
  to anon, authenticated
  with check (referrer_code is not null and length(trim(referrer_code)) > 0);

create policy "survey_responses_admin_read"
  on public.survey_responses
  for select
  to authenticated
  using (auth.role() = 'authenticated');

create policy "report_subscribers_admin_read"
  on public.report_subscribers
  for select
  to authenticated
  using (auth.role() = 'authenticated');

create policy "referral_events_admin_read"
  on public.referral_events
  for select
  to authenticated
  using (auth.role() = 'authenticated');
