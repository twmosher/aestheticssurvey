# Aesthetic Workforce Design Spec

## Product Summary

**Company:** Aesthetic Workforce

**Launch Product:** 2026 Massachusetts Aesthetic Compensation Report

**Tagline:** Better information. Better careers. Better practices.

This product is a premium, mobile-first editorial website and survey experience built to convert Massachusetts medical-aesthetic professionals into completed anonymous compensation survey responses and report subscribers. Traffic is expected to come primarily from Instagram, so the site must communicate credibility, anonymity, and ease of completion within the first screen on a phone.

The site will not present speculative compensation benchmarks or fake results. Until enough valid responses exist, the product will present a “benchmark being prepared” state and focus on encouraging qualified survey participation and subscriber opt-in.

## Goals

### Primary Goal

Convert qualified Massachusetts aesthetic professionals into:

1. Completed anonymous survey responses
2. Email subscribers for benchmark delivery and report release

### Secondary Goals

1. Build trust through clear privacy and editorial-quality presentation
2. Preserve attribution from Instagram and other campaign links
3. Give administrators a secure, analyst-friendly system for reviewing, filtering, and exporting results
4. Establish a production-ready codebase that can support future state-by-state or report-by-report expansion

## Non-Goals

1. Public benchmark dashboards at launch
2. User accounts for participants
3. Claiming statistical representativeness before enough data exists
4. Publishing any individual compensation data
5. Complex CMS tooling for launch

## Users

### Primary Audience

Massachusetts medical-aesthetic professionals including:

1. Nurse injectors
2. Registered nurses
3. Nurse practitioners
4. Physician assistants
5. Physicians
6. Licensed aestheticians
7. Laser technicians
8. Patient coordinators
9. Practice managers
10. Medical directors

### Secondary Audience

Internal administrators and analysts reviewing response quality, attribution, completion rates, and exportable data.

## Brand and Visual Direction

### Desired Brand Feel

The brand should feel like a premium business publication combined with a modern professional network. It should signal seriousness, discretion, and industry fluency rather than consumer beauty marketing.

### Visual System

1. Warm ivory background
2. Deep charcoal typography
3. Muted burgundy, clay, or stone accent system
4. Large editorial serif headlines
5. Clean sans-serif body and interface copy
6. Spacious layout and disciplined vertical rhythm
7. Subtle borders and section dividers
8. Minimal data motifs, charts, or grid treatments
9. Rounded but not exaggerated controls
10. Restrained motion and microinteractions

### Explicitly Avoid

1. Stock imagery of syringes
2. Before-and-after visuals
3. Beauty-adjacent glossy photography
4. Neon gradients
5. Generic SaaS blue
6. Cheap pink or faux-luxury gold styling
7. Overly clinical healthcare aesthetics
8. Overly feminine lifestyle branding

### Tone

Tone should lean professional, polished, and editorial. Copy should sound like a credible industry report in progress, not like a conversion-optimized med-spa landing page. It should remain warm and accessible, especially around anonymity and completion instructions.

## Technology Decisions

### Stack

1. Next.js with App Router
2. TypeScript
3. Tailwind CSS
4. Supabase for database, RLS, and admin auth
5. React Hook Form for client-side form control
6. Zod for validation and inferred types
7. Resend for optional email sending when configured
8. Vercel-compatible deployment
9. Lightweight internal analytics event layer with optional adapter path for Plausible or PostHog later
10. Vitest and Testing Library for unit and component tests
11. Playwright for end-to-end coverage

### Architecture Rationale

The launch should use a focused homepage and a dedicated `/survey` route rather than embedding the survey inline or inside a modal. This creates the best balance of polish, reliability, accessibility, back/forward behavior, local restore behavior, and analytics instrumentation on mobile browsers including Instagram’s in-app browser.

## Information Architecture

### Public Routes

1. `/` homepage
2. `/survey` conversational survey experience
3. `/survey/email` post-completion email capture
4. `/thank-you` confirmation and sharing page
5. `/about`
6. `/privacy`
7. `/terms`

### Protected Routes

1. `/admin/login`
2. `/admin`
3. `/admin/responses`
4. `/admin/review`

### Route Responsibilities

`/` is an editorial landing page focused on trust and conversion.

`/survey` is an app-like, one-question-per-screen flow with progress, local autosave, conditional branching, and anonymous submission.

`/survey/email` collects optional first-party email data only after the anonymous survey has already been submitted.

`/thank-you` confirms participation, explains benchmark preparation, and offers sharing/referral actions.

Protected admin routes expose metrics, response review, export tools, and data-quality actions only to authenticated administrators.

## Homepage Experience

### Navigation

The homepage header should be minimal and sticky on mobile:

1. Aesthetic Workforce logo wordmark
2. About
3. Privacy
4. Start Survey button

The Start Survey button should remain visually prominent without making the header feel ad-like.

### Hero

The hero must communicate the core value proposition immediately above the fold on mobile:

**Headline:** Are Massachusetts aesthetic professionals being paid fairly?

**Subheadline:** The first independent compensation benchmark for injectors, aesthetic nurses, NPs, PAs, aestheticians and other medical-aesthetic professionals across Massachusetts.

**Supporting copy:** Share your compensation anonymously. See how your pay compares. Help make the industry more transparent.

**Primary CTA:** Compare My Compensation

**Trust line:** Anonymous • Approximately 4 minutes • Individual responses are never published

### Supporting Sections

The homepage should include:

1. Large editorial question section
2. Participant benefits cards
3. Who should participate section
4. Why this matters section
5. Privacy and trust section
6. Strong secondary CTA blocks
7. Footer with privacy, terms, contact, and copyright

### Conversion Principles

1. Keep the core CTA repeated but not noisy
2. Ensure every section helps answer “Why should I trust this?” or “Why should I do this now?”
3. Avoid overcrowding the homepage with operational detail better handled inside the survey flow

## Survey Experience

### Core UX

The survey should be a one-question-per-screen conversational flow designed first for a 390px mobile viewport. Each screen should feel focused, quiet, and easy to complete.

### Required Behaviors

1. Mobile-first layout
2. One question per screen
3. Progress indicator
4. Back and next buttons
5. Keyboard accessibility
6. Smooth but restrained transitions
7. Estimated completion time display
8. Autosave to local storage
9. Restore previous progress on return
10. Strong validation
11. Conditional question logic
12. Stable anonymous response ID
13. No email asked before anonymous compensation submission

### Survey Opening Screen

**Headline:** Let’s find the right comparison group.

**Supporting copy:** Your answers are anonymous and will only be reported in aggregate.

**Button:** Begin

### Section Structure

The survey will preserve the full question set from the prompt rather than condensing it. Questions will be grouped into logical sections with visible progress:

1. Professional profile
2. Work structure
3. Compensation
4. Skills and production
5. Satisfaction and mobility
6. Consent

### Conditional Logic

At minimum:

1. Hourly compensation paths ask hourly rate
2. Salary compensation paths ask annual salary
3. Commission structure questions appear only when applicable
4. Certain numeric prompts can adapt their helper copy by role or compensation structure

### Validation Strategy

Validation should combine:

1. Client-side Zod schemas per question/step
2. Server-side validation on submission
3. Clear inline feedback
4. Defensive coercion/parsing for numeric fields
5. Guardrails against accidental empty or partial submission

### Data Persistence Strategy

The client will store:

1. Current step index
2. Current answers
3. Anonymous response token
4. Attribution metadata needed across routes
5. Submission status guards to avoid duplicate inserts

Local storage should be durable enough that Instagram/browser refreshes do not wipe the in-progress form unexpectedly.

## Consent and Submission

Before final anonymous submission, the participant must explicitly confirm:

“I understand that my responses will be analyzed in aggregate for workforce research and compensation benchmarking.”

This checkbox is required and should include a link to the privacy policy.

Anonymous survey submission happens before email capture. This is a hard product rule.

## Email Capture Experience

### Purpose

After the anonymous survey response is saved, the participant is invited to subscribe for benchmark delivery and report release updates.

### Screen Content

**Headline:** Your comparison is being prepared.

**Copy:** Your anonymous response has been recorded.

The page should explain that the email is used to send:

1. Preliminary compensation comparison
2. The complete Massachusetts report when released
3. Updated benchmarks as more professionals participate

### Data Separation

Email records must be stored separately from the anonymous compensation record. The only link allowed is the anonymous response token stored as an internal reference. The interface should state clearly that email will not be attached to the published response.

### Email Delivery

If `RESEND_API_KEY` is available, the app sends a polished confirmation email.

If the key is not available, the flow still stores the subscriber and proceeds without visible failure.

### Consent

The form must include clear email consent language and unsubscribe language.

## Thank-You and Referral Experience

### Thank-You Message

**Headline:** You are now part of the Massachusetts benchmark.

The page should confirm participation and explain that a private benchmark will be delivered once enough comparable responses exist.

### Sharing

The page should include:

1. Share on Instagram
2. Copy Survey Link
3. Share by text
4. Share by email

Share copy:

“I contributed anonymously to the 2026 Massachusetts Aesthetic Compensation Report. Help make compensation in Massachusetts aesthetics more transparent.”

No personal compensation information should ever appear in share content.

### Referral Tracking

Sharing links should carry a referrer code when available. Referral completions should be recorded independently from raw survey responses.

## Analytics

### Events

Track:

1. `landing_page_view`
2. `survey_started`
3. `survey_section_completed`
4. `survey_completed`
5. `email_submitted`
6. `email_skipped`
7. `share_clicked`
8. `copy_link_clicked`
9. `referral_completed`

### Attribution

The product should preserve and propagate:

1. `utm_source`
2. `utm_medium`
3. `utm_campaign`
4. `referrer_code`
5. landing page variant identifier if used

These values should move from the landing page through survey completion and subscriber insert where appropriate.

### Analytics Implementation

Launch with a lightweight internal event layer that can:

1. emit client-side analytics events
2. optionally log selected events server-side if desired
3. avoid heavy bundle impact
4. support future adapter expansion for Plausible or PostHog

## Database Design

### Core Principles

1. Anonymous compensation data and email identity data are stored separately
2. Public clients can insert valid records but cannot read raw data
3. Admin users authenticated through Supabase can read and export data
4. Test/invalid records can be excluded without deletion

### Tables

#### `survey_responses`

Stores anonymous compensation and workforce survey responses.

Required fields:

1. `id`
2. `anonymous_token`
3. `role`
4. `region`
5. `aesthetics_experience`
6. `healthcare_experience`
7. `workplace_type`
8. `employer_location_count`
9. `employment_arrangement`
10. `weekly_hours`
11. `employer_tenure`
12. `restrictive_agreement`
13. `compensation_structure`
14. `hourly_rate`
15. `annual_salary`
16. `receives_commission`
17. `commission_type`
18. `commission_value`
19. `total_annual_earnings_range`
20. `benefits`
21. `services_performed`
22. `injectable_volume_range`
23. `monthly_revenue_range`
24. `brings_patient_following`
25. `requested_patient_percentage_range`
26. `sales_expectation`
27. `compensation_fairness_score`
28. `job_mobility`
29. `reasons_to_leave`
30. `compensation_frustration`
31. `employer_retention_feedback`
32. `consented`
33. `created_at`
34. `completed_at`
35. `referrer_code`
36. `utm_source`
37. `utm_medium`
38. `utm_campaign`
39. `user_agent`
40. `landing_page_variant`

Additional launch-support fields should also be included:

1. `is_test`
2. `is_invalid`
3. `invalid_reason`

#### `report_subscribers`

Stores subscriber identity data separately.

Required fields:

1. `id`
2. `email`
3. `first_name`
4. `anonymous_response_token`
5. `consented_to_email`
6. `created_at`
7. `unsubscribed_at`
8. `utm_source`
9. `utm_campaign`

#### `referral_events`

Stores successful referral linkage.

Required fields:

1. `id`
2. `referrer_code`
3. `referred_response_token`
4. `created_at`

### Row Level Security

RLS policies should allow:

1. anonymous inserts into public submission tables only through allowed columns and validation expectations
2. no anonymous raw reads
3. authenticated admin read access
4. authenticated admin update access for `is_test`, `is_invalid`, and related review fields

## Admin Experience

### Authentication

Use Supabase Auth for administrator access at launch. This is the chosen launch posture and should be implemented as the only supported production admin path.

### Dashboard Goals

The admin should be analyst-heavy rather than merely operational. It must make it easy to understand funnel health, data quality, and segmentation without exposing data publicly.

### Primary Dashboard Metrics

1. Total survey starts
2. Completed responses
3. Completion rate
4. Email capture rate
5. Responses by role
6. Responses by region
7. Responses by employment type
8. Responses by compensation structure
9. Average compensation fairness score
10. Number open to new opportunities
11. Top traffic sources
12. Referral conversion
13. Recent responses

### Admin Features

1. CSV export
2. Filters by date, role, and region
3. Ability to exclude test responses
4. Ability to mark responses invalid
5. Separate protected review area for free-text answers
6. No public access under any condition

### Dashboard Data Handling

Free-text responses should not appear on the main dashboard by default. They should be isolated in a separate protected review area to reduce accidental exposure and keep the main dashboard focused on analysis.

## Privacy and Policy

### Privacy Principles

The privacy page must explain in plain English:

1. what information is collected
2. why it is collected
3. how compensation data is used
4. that results are published only in aggregate
5. that small groups may be suppressed
6. that names are not required
7. that employers are not notified
8. that email is stored separately
9. that users can request deletion
10. that the report is informational and not legal, tax, or employment advice

### Trust Messaging

The product should repeatedly but tastefully reinforce:

1. anonymity
2. aggregation-only publication
3. separate email storage
4. non-notification of employers
5. suppression of small comparison groups

## SEO and Metadata

### Core Metadata Targets

1. Massachusetts aesthetic compensation
2. Nurse injector salary Massachusetts
3. Aesthetic RN salary Boston
4. Med spa compensation Massachusetts
5. Medical aesthetics careers Massachusetts

### Required Metadata

Homepage title:

`Massachusetts Aesthetic Compensation Report | Aesthetic Workforce`

Homepage description:

`An anonymous compensation benchmark for injectors, aesthetic nurses, NPs, PAs, aestheticians and medical-aesthetic professionals across Massachusetts.`

### Social Sharing

The site should include strong Open Graph and Twitter card metadata, including a share image that looks polished in Instagram-adjacent sharing contexts. The OG treatment should feel editorial and brand-consistent.

## Performance and Accessibility

### Performance Targets

1. Lighthouse mobile performance above 90
2. Minimal client JavaScript where possible
3. Fast load in Instagram in-app browser
4. No layout shifts
5. Responsive assets only

### Accessibility Targets

1. Strong color contrast
2. Keyboard-accessible survey
3. Proper focus states
4. Semantic headings and landmarks
5. Screen-reader-friendly progress and validation
6. Touch-friendly targets on mobile

## Testing Strategy

### Required Tests

1. Unit tests for validation schemas
2. Unit tests for conditional question logic
3. End-to-end test for full survey flow
4. Test for restoring survey progress
5. Test for separate storage of survey response and email
6. Test for admin protection

### Fixtures

Provide local test fixtures for survey responses without inserting fake production data into deployed databases.

## Configuration and Operations

### Environment Files

The project must include a clean `.env.example` covering:

1. public site URL
2. Supabase URL
3. Supabase anon key
4. Supabase service role key where required for server-only use
5. Supabase admin auth configuration
6. Resend API key
7. Resend sender
8. contact email placeholder
9. analytics configuration values

### Deployment

The project must be Vercel-compatible and documented clearly in the README, including:

1. local setup
2. required environment variables
3. Supabase migration execution
4. admin user setup
5. optional email setup
6. deployment flow to Vercel

## Deliverables Mapping

This build must produce:

1. complete source code
2. Supabase SQL migrations
3. `.env.example`
4. README with setup and deployment instructions
5. Vercel deployment configuration
6. responsive homepage
7. conversational survey
8. email capture flow
9. thank-you and sharing page
10. protected admin dashboard
11. privacy and terms pages
12. basic test suite
13. seed fixtures for local testing
14. clear notes for any remaining manual setup

## Implementation Boundaries

### Included in Launch

1. Full homepage and survey flow
2. Anonymous submission architecture
3. Separate subscriber capture
4. Supabase migrations and RLS
5. Protected admin dashboard and review routes
6. Analytics event layer
7. Local tests and fixtures
8. Vercel-ready deployment documentation

### Deferred Until Later

1. Public benchmark visualizations
2. Automated benchmark calculations shown to participants
3. Multi-state expansion UI
4. Complex outbound CRM flows
5. Public-facing report browsing

## Open Implementation Assumptions

1. A single launch report is sufficient, so site architecture can remain single-product but should be structured for later expansion.
2. Contact email will be supplied through environment configuration.
3. An admin user will be created manually in Supabase Auth during setup unless a preferred bootstrap path is added to the README.
4. The benchmark comparison experience after sign-up will remain in “being prepared” state until enough real data exists.

## Spec Self-Review

### Placeholder Check

No unresolved placeholders, TODO markers, or ambiguous implementation stubs remain in this spec. Remaining external values are explicitly called out as environment-based setup inputs.

### Consistency Check

The design consistently uses a dedicated survey route, full survey scope, Supabase Auth for admin, separate compensation and email storage, and an analyst-heavy admin experience.

### Scope Check

The scope is large but still coherent as one implementation plan because all features serve one focused launch product with a shared stack, shared data model, and shared deployment target.

### Ambiguity Check

Potentially ambiguous choices have been resolved as follows:

1. survey is not condensed
2. tone leans professional/editorial rather than beauty-oriented
3. admin is analyst-heavy
4. admin auth uses Supabase Auth
5. email sending is enabled conditionally when Resend is configured
