# Aesthetic Career Club Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven execution for this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the current site into a deployable Aesthetic Career Club launch with the Massachusetts-first public experience, broader-ready survey/data model, persistence, admin reporting, analytics, and deployment wiring.

**Architecture:** Keep the existing Next.js App Router foundation and survey flow, then extend it in place. Rebrand the public shell to Aesthetic Career Club, deepen the survey’s geography/licensure/scope model, wire anonymous survey and subscriber flows to persistence through Supabase-ready contracts, and finish the admin/reporting/deployment surfaces without diluting the Massachusetts-first launch story.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, React Hook Form, Zod, Supabase, Resend, Vitest, Playwright, Vercel.

---

## Current State Snapshot

Already implemented in the feature worktree:

- Public homepage and legal pages
- Conversational survey shell
- Anonymous survey API contract
- Separate email capture flow
- Thank-you/share flow
- Survey model, conditional logic, autosave/restore
- Unit tests and Playwright scaffolding

Still missing or incomplete:

- Brand rename to Aesthetic Career Club across product surfaces
- Broader-ready geography and deep credentials model
- Subscriber contract + survey model expansion through UI and validation
- Supabase schema, types, and RLS
- Real persistence for survey and subscribers
- Admin dashboard and exports
- Analytics/event wiring
- README/deployment completion
- Final live deployment workflow

## File Structure To Add or Update

### Rebrand and Public Surfaces

- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/privacy/page.tsx`
- Modify: `app/terms/page.tsx`
- Modify: `app/thank-you/page.tsx`
- Modify: `components/site/header.tsx`
- Modify: `components/site/footer.tsx`
- Modify: `components/site/hero.tsx`
- Modify: `components/site/share-actions.tsx`
- Modify: `lib/constants.ts`
- Modify: `lib/metadata.ts`

### Survey Model and Flow

- Modify: `lib/survey/types.ts`
- Modify: `lib/survey/questions.ts`
- Modify: `lib/survey/defaults.ts`
- Modify: `lib/survey/logic.ts`
- Modify: `lib/survey/storage.ts`
- Modify: `lib/validation/survey.ts`
- Modify: `lib/survey/transformers.ts`
- Modify: `components/survey/survey-shell.tsx`
- Modify: `components/survey/question-renderer.tsx`
- Modify: `components/survey/question-step.tsx`
- Modify: `app/survey/page.tsx`

### Subscriber Flow

- Modify: `lib/validation/subscriber.ts`
- Modify: `app/api/subscribers/route.ts`
- Modify: `components/survey/email-capture-form.tsx`
- Modify: `app/survey/email/page.tsx`

### Persistence and Supabase

- Create: `lib/supabase/browser.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`
- Create: `supabase/migrations/202607200001_initial_schema.sql`
- Create: `supabase/seed/test-fixtures.sql`
- Create: `types/database.ts`
- Modify: `app/api/survey/route.ts`
- Modify: `app/api/subscribers/route.ts`

### Admin and Reporting

- Create: `lib/auth/admin.ts`
- Create: `lib/admin/queries.ts`
- Create: `lib/admin/formatters.ts`
- Create: `lib/admin/csv.ts`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/page.tsx`
- Create: `app/admin/responses/page.tsx`
- Create: `app/admin/review/page.tsx`
- Create: `app/api/admin/export/route.ts`
- Create: `components/admin/metric-card.tsx`
- Create: `components/admin/chart-card.tsx`
- Create: `components/admin/filter-bar.tsx`
- Create: `components/admin/recent-responses-table.tsx`
- Create: `components/admin/free-text-review.tsx`

### Analytics, Email, Docs, and Deploy

- Create: `lib/analytics/events.ts`
- Create: `lib/analytics/client.ts`
- Create: `lib/analytics/server.ts`
- Create: `app/api/analytics/route.ts`
- Create: `lib/email/resend.ts`
- Create: `lib/email/templates/benchmark-confirmation.tsx`
- Modify: `.env.example`
- Modify: `README.md`
- Modify: `vercel.json`
- Create or update: any `.openai/hosting.json`-driven hosting files if needed

### Tests

- Modify: `tests/unit/survey.logic.test.ts`
- Modify: `tests/unit/storage.test.ts`
- Modify: `tests/unit/survey.validation.test.ts`
- Modify: `tests/unit/subscriber-separation.test.ts`
- Modify: `tests/unit/survey-shell.test.tsx`
- Create: `tests/unit/admin-protection.test.ts`
- Create: `tests/unit/analytics.test.ts`
- Create: `tests/unit/readme.test.ts`
- Create: `tests/unit/schema-files.test.ts`
- Modify: `tests/e2e/survey-flow.spec.ts`
- Modify: `tests/e2e/survey-restore.spec.ts`
- Create: `tests/e2e/admin-protection.spec.ts`

## Task 1: Rebrand the Public Experience to Aesthetic Career Club

**Files:**
- Modify: `lib/constants.ts`
- Modify: `lib/metadata.ts`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/privacy/page.tsx`
- Modify: `app/terms/page.tsx`
- Modify: `app/thank-you/page.tsx`
- Modify: `components/site/header.tsx`
- Modify: `components/site/footer.tsx`
- Modify: `components/site/hero.tsx`

- [ ] **Step 1: Write failing brand/copy tests**
- [ ] **Step 2: Run the tests to verify they fail for the right reason**
- [ ] **Step 3: Replace public brand strings with `Aesthetic Career Club` while keeping Massachusetts-first flagship copy**
- [ ] **Step 4: Update About/legal/metadata copy so the site presents Aesthetic Career Club as the broader brand and the Massachusetts report as the current flagship**
- [ ] **Step 5: Re-run targeted tests, lint, and build**

## Task 2: Expand the Survey Model for Geography, Licensure, Credentials, and Scope

**Files:**
- Modify: `lib/survey/types.ts`
- Modify: `lib/survey/questions.ts`
- Modify: `lib/survey/defaults.ts`
- Modify: `lib/survey/logic.ts`
- Modify: `lib/survey/storage.ts`
- Modify: `tests/unit/survey.logic.test.ts`
- Modify: `tests/unit/storage.test.ts`

- [ ] **Step 1: Write failing tests for the new geography and credentials question model**
- [ ] **Step 2: Run them to verify red**
- [ ] **Step 3: Add broader-ready fields**
  - `primaryState`
  - `activeStates`
  - `practicesInMassachusetts`
  - `practicesInMultipleStates`
  - `primaryLicense`
  - `additionalLicenses`
  - `boardCertified`
  - `boardCertificationType`
  - `hasPrescriptiveAuthority`
  - `independentTreatmentPlanning`
  - `independentPrescribing`
  - `requiresPhysicianSignoffTreatment`
  - `requiresPhysicianSignoffPrescribing`
  - `worksUnderMedicalDirector`
  - `isMedicalDirector`
  - `isInjector`
  - `licenseArrangement`
  - `advancedTrainingPathway`
  - `deviceCertifications`
  - `clinicalScopeCategory`
  - `supervisoryScope`
  - `ownershipStatus`
- [ ] **Step 4: Add conditional logic that keeps the deeper section mobile-usable**
- [ ] **Step 5: Re-run the survey-model and storage tests**

## Task 3: Extend Validation and Anonymous Submission Contracts for the Deeper Survey

**Files:**
- Modify: `lib/validation/survey.ts`
- Modify: `lib/survey/transformers.ts`
- Modify: `app/api/survey/route.ts`
- Modify: `tests/unit/survey.validation.test.ts`

- [ ] **Step 1: Write failing validation tests for the new geography/credential fields**
- [ ] **Step 2: Run them to confirm red**
- [ ] **Step 3: Extend visibility-aware validation for the deeper survey**
- [ ] **Step 4: Extend the anonymous submission transformer so the expanded model can be persisted cleanly later**
- [ ] **Step 5: Keep the route contract stable while broadening the accepted payload**
- [ ] **Step 6: Re-run validation tests, lint, typecheck, and build**

## Task 4: Upgrade the Survey UI, Email Capture, and Thank-You Flow to Match the Expanded Model

**Files:**
- Modify: `components/survey/survey-shell.tsx`
- Modify: `components/survey/question-renderer.tsx`
- Modify: `components/survey/question-step.tsx`
- Modify: `components/survey/progress-bar.tsx`
- Modify: `components/survey/multi-select.tsx`
- Modify: `components/survey/range-scale.tsx`
- Modify: `components/survey/email-capture-form.tsx`
- Modify: `app/survey/page.tsx`
- Modify: `app/survey/email/page.tsx`
- Modify: `app/thank-you/page.tsx`
- Modify: `components/site/share-actions.tsx`
- Modify: `lib/validation/subscriber.ts`
- Modify: `app/api/subscribers/route.ts`
- Modify: `tests/unit/subscriber-separation.test.ts`
- Modify: `tests/unit/survey-shell.test.tsx`
- Modify: `tests/e2e/survey-flow.spec.ts`
- Modify: `tests/e2e/survey-restore.spec.ts`

- [ ] **Step 1: Write failing tests for new credential/geography flow behavior and any email-step contract changes**
- [ ] **Step 2: Run them to confirm red**
- [ ] **Step 3: Add the deeper questions without breaking the one-question mobile experience**
- [ ] **Step 4: Keep autosave/restore stable with the expanded answer model**
- [ ] **Step 5: Preserve the anonymous-submit-then-email sequencing**
- [ ] **Step 6: Re-run unit tests and the e2e suite**
- [ ] **Step 7: If Playwright sandbox binding still blocks, run the best available in-browser/local verification and record the blocker clearly**

## Task 5: Add Supabase Schema, Persistence, and RLS

**Files:**
- Create: `supabase/migrations/202607200001_initial_schema.sql`
- Create: `supabase/seed/test-fixtures.sql`
- Create: `types/database.ts`
- Create: `lib/supabase/browser.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`
- Modify: `app/api/survey/route.ts`
- Modify: `app/api/subscribers/route.ts`
- Create: `tests/unit/schema-files.test.ts`

- [ ] **Step 1: Write failing schema/persistence presence tests**
- [ ] **Step 2: Run them to confirm red**
- [ ] **Step 3: Create the initial schema with broader-ready survey columns and separate subscriber storage**
- [ ] **Step 4: Add RLS policies for public inserts and admin reads**
- [ ] **Step 5: Wire the survey/subscriber routes to actual persistence**
- [ ] **Step 6: Add local fixtures without creating fake production data**
- [ ] **Step 7: Re-run schema tests, lint, typecheck, and build**

## Task 6: Add Admin Authentication, Dashboard, and CSV Export

**Files:**
- Create: `lib/auth/admin.ts`
- Create: `lib/admin/queries.ts`
- Create: `lib/admin/formatters.ts`
- Create: `lib/admin/csv.ts`
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/page.tsx`
- Create: `app/admin/responses/page.tsx`
- Create: `app/admin/review/page.tsx`
- Create: `app/api/admin/export/route.ts`
- Create: `components/admin/metric-card.tsx`
- Create: `components/admin/chart-card.tsx`
- Create: `components/admin/filter-bar.tsx`
- Create: `components/admin/recent-responses-table.tsx`
- Create: `components/admin/free-text-review.tsx`
- Create: `tests/unit/admin-protection.test.ts`
- Create: `tests/e2e/admin-protection.spec.ts`

- [ ] **Step 1: Write failing admin-protection tests**
- [ ] **Step 2: Run them to confirm red**
- [ ] **Step 3: Add Supabase-auth-backed admin gating**
- [ ] **Step 4: Build analyst-heavy dashboard queries, filters, metrics, and export**
- [ ] **Step 5: Keep free-text review protected and separate**
- [ ] **Step 6: Re-run admin tests, lint, and build**

## Task 7: Add Analytics and Resend-Wired Subscriber Follow-Up

**Files:**
- Create: `lib/analytics/events.ts`
- Create: `lib/analytics/client.ts`
- Create: `lib/analytics/server.ts`
- Create: `app/api/analytics/route.ts`
- Create: `lib/email/resend.ts`
- Create: `lib/email/templates/benchmark-confirmation.tsx`
- Modify: `components/site/share-actions.tsx`
- Modify: `components/survey/survey-shell.tsx`
- Modify: `components/survey/email-capture-form.tsx`
- Create: `tests/unit/analytics.test.ts`

- [ ] **Step 1: Write failing analytics/email tests**
- [ ] **Step 2: Run them to confirm red**
- [ ] **Step 3: Add the required funnel events and lightweight event-dispatch layer**
- [ ] **Step 4: Add conditional Resend email sending when configured**
- [ ] **Step 5: Re-run targeted tests, lint, and build**

## Task 8: Finish Environment, README, and Deployment Readiness

**Files:**
- Modify: `.env.example`
- Create or modify: `README.md`
- Modify: `vercel.json`
- Create or modify: `.openai/hosting.json` related files if the repo gains Sites hosting configuration
- Create: `tests/unit/readme.test.ts`

- [ ] **Step 1: Write failing docs/config tests**
- [ ] **Step 2: Run them to confirm red**
- [ ] **Step 3: Document local setup, Supabase setup, admin creation, Resend config, and deployment**
- [ ] **Step 4: Ensure `.env.example` matches the final code paths**
- [ ] **Step 5: Re-run readme/config tests, lint, typecheck, and build**

## Task 9: Final Verification and Deployment Execution

**Files:**
- Review only unless fixes are needed

- [ ] **Step 1: Run the full verification suite**
  - `npm test`
  - `npm run lint`
  - `npm run build`
  - `npx tsc --noEmit`
  - Playwright survey/admin flows where possible
- [ ] **Step 2: Run the app locally and do a live survey smoke test at mobile width**
- [ ] **Step 3: Push the updated feature branch**
- [ ] **Step 4: If deployment config is complete, deploy the site and verify the live URL**
- [ ] **Step 5: Update the draft PR summary with the final scope and any remaining manual setup**

## Plan Self-Review

### Spec Coverage

Covered:

- Aesthetic Career Club rebrand
- Massachusetts-first public posture
- broader-ready geography model
- deep credentials/licensure expansion
- persistence and schema completion
- admin/reporting
- analytics and email
- deployment readiness

### Placeholder Scan

No `TODO` or `TBD` placeholders remain. The new fields are explicit enough to drive implementation even though final naming can still follow repo conventions.

### Type Consistency

The plan assumes we continue using the existing `SurveyAnswers`, `SURVEY_QUESTIONS`, `surveySubmissionSchema`, and subscriber route patterns rather than introducing a second parallel form architecture.

### Scope Check

This plan is intentionally focused on finishing the current branch into a deployable launch. It does not try to redesign the product into a fully national public experience yet.
