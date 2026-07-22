# Aesthetic Career Club Expansion Design Spec

## Purpose

This document updates the approved July 14, 2026 design for the current launch. It supersedes the earlier spec anywhere the brand, survey scope, positioning, or data model are described.

The build should now present a broader brand called **Aesthetic Career Club** while keeping the public launch experience focused on the **2026 Massachusetts Aesthetic Compensation Report**. The survey and data model should expand materially so the product can support future multi-state reporting and deeper professional analysis without another schema reset.

## Updated Brand

### Company Name

**Aesthetic Career Club**

### Current Featured Product

**2026 Massachusetts Aesthetic Compensation Report**

### Positioning

The public site should feel Massachusetts-first for this launch, but the brand itself should signal something broader: a long-term career and compensation intelligence platform for medical-aesthetic professionals.

The product should not yet market itself as a national report. Instead, it should quietly establish a broader identity while making it clear that the current flagship benchmark is Massachusetts-focused.

### Public Messaging Rule

Use this framing consistently:

1. The brand is **Aesthetic Career Club**
2. The current flagship benchmark is the **2026 Massachusetts Aesthetic Compensation Report**
3. The public homepage should still feel tightly focused on Massachusetts
4. The data model and survey should be broader under the hood

## Launch Positioning Update

### Recommended Launch Posture

**Quietly broader backend**

This means:

1. Public copy remains Massachusetts-first
2. The survey and database architecture are expanded now to support multi-state and richer professional segmentation later
3. The site should not force a second major redesign when the brand expands beyond Massachusetts

### What Should Stay Massachusetts-First

1. Homepage promise
2. Current flagship report title
3. Most public-facing report copy
4. Thank-you page explanation of the current benchmark effort

### What Should Become Broader Now

1. Brand name
2. Survey respondent profile depth
3. Geography model
4. Credentials and licensure model
5. Admin/reporting structure
6. Database schema for future state-by-state and cross-state analysis

## Visual and Tone Update

### Visual Identity

The current premium editorial direction should remain. No visual reset is required beyond brand naming and subtle positioning shifts.

Keep:

1. Warm ivory background
2. Deep charcoal type
3. Muted burgundy, clay, and stone accents
4. Editorial serif headlines
5. Clean sans-serif body text
6. Spacious layouts
7. Refined borders and motion

### Tone Update

The tone should remain professional and editorial, but the brand should feel slightly more like a serious professional network or career-intelligence club than a one-off report microsite.

It should still avoid:

1. Beauty-marketing language
2. Consumer med-spa aesthetics
3. Generic SaaS copy
4. Overclaiming the current report scope

## Homepage Changes

### Brand Rename

Change all brand references from **Aesthetic Workforce** to **Aesthetic Career Club**.

### Public Framing

The homepage should still sell the Massachusetts report first. The user should leave the first viewport understanding:

1. this is for Massachusetts aesthetic professionals right now
2. they can anonymously compare compensation
3. the broader brand is Aesthetic Career Club

### Recommended Messaging Approach

Keep the existing homepage structure and hero copy largely intact, but adjust surrounding brand language so:

1. navigation/logo uses **Aesthetic Career Club**
2. footer and legal pages use **Aesthetic Career Club**
3. About page explains that the current benchmark is the first flagship report from the broader brand

### About Page Update

The About page should explicitly explain:

1. Aesthetic Career Club is building compensation and career intelligence for medical-aesthetic professionals
2. the Massachusetts report is the current flagship benchmark
3. the platform is being structured for broader long-term reporting

## Survey Expansion

### Goal

The survey should gather much more information about each respondent’s role, licenses, credentials, autonomy, and scope of practice so the resulting data becomes more analytically valuable than a basic compensation poll.

### Product Principle

The survey should remain easy to complete on mobile, but it should gather deeper professional detail through well-structured questions rather than loose free text.

### Survey Scope Change

Keep the current compensation and work-structure sections, but add a new **Credentials and Scope** section and broaden geography handling.

### New Geography Model

The current survey must stop assuming Massachusetts-only identity in the underlying answer model.

Add fields for:

1. primary state of practice
2. all active states of licensure or practice
3. whether Massachusetts is the respondent’s main market
4. whether the respondent practices in more than one state

The public launch can still foreground Massachusetts, but the data model should not require future breaking changes to support respondents outside Massachusetts.

## Deep Credentials and Licensure Section

### New Section Name

**Credentials and Scope**

### Objectives

This section should make it possible to analyze compensation by:

1. license type
2. number of active licenses
3. jurisdiction
4. certification level
5. prescriptive authority
6. physician supervision dependency
7. injector status
8. procedural scope
9. ownership or medical-director dependency

### Required New Fields

Add structured questions for:

1. Primary professional license
2. Additional licenses held
3. Primary state of licensure
4. Additional active states
5. Whether the respondent currently holds an active Massachusetts license
6. Whether the respondent currently practices in Massachusetts
7. Whether the respondent holds prescriptive authority
8. Whether the respondent is board certified
9. Relevant board certification type
10. Whether the respondent independently assesses and treatment-plans patients
11. Whether the respondent independently prescribes within their role
12. Whether the respondent requires physician sign-off for treatment planning
13. Whether the respondent requires physician sign-off for prescribing
14. Whether the respondent works under a medical director
15. Whether the respondent is themselves the medical director
16. Whether the respondent is an injector
17. Whether the respondent performs laser or energy-device treatments under their own license
18. Whether the respondent operates under their own license, another clinician’s license, or a delegated arrangement
19. Advanced training or fellowship pathway
20. Device or treatment certifications held

### Structured Field Design

Where possible, these should be structured as:

1. single select
2. multi-select
3. yes/no
4. scoped conditional follow-ups

Avoid relying on large open text areas for licensure or credentials unless the answer is genuinely uncommon.

## Expanded Role Model

The role model should become richer and less Massachusetts-specific while keeping the current respondent types.

### Keep Existing Public Role Categories

Continue supporting:

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

### Add Supporting Structured Attributes

Add fields that clarify:

1. whether the respondent’s current role is clinical, operational, ownership, or hybrid
2. whether they currently perform procedures personally
3. whether they supervise other clinicians
4. whether they own, part-own, or operate a practice
5. whether they bring their own patient following as an employed, contractor, or owner operator

## Compensation Analysis Implications

The survey should now support deeper future cuts such as:

1. compensation by state and region
2. compensation by license type
3. compensation by injector status
4. compensation by prescriptive authority
5. compensation by board certification
6. compensation by autonomy level
7. compensation by ownership dependency
8. compensation by multi-state practice status
9. compensation by procedural scope
10. compensation by advanced certifications and training

This is why the deeper survey is worth the added complexity.

## Database and Schema Changes

### Core Rule

The database should be updated now so future geographic expansion and credential analysis do not require destructive redesign.

### New Survey Response Fields

Add or update fields on the survey response record for:

1. current_brand
2. primary_state
3. active_states
4. practices_in_massachusetts
5. primary_license
6. additional_licenses
7. board_certified
8. board_certification_type
9. has_prescriptive_authority
10. independent_treatment_planning
11. independent_prescribing
12. requires_physician_signoff_treatment
13. requires_physician_signoff_prescribing
14. works_under_medical_director
15. is_medical_director
16. is_injector
17. license_arrangement
18. advanced_training_pathway
19. device_certifications
20. clinical_scope_category
21. supervisory_scope
22. ownership_status

Exact final column naming can follow the repo’s existing database naming conventions, but the schema should cover these concepts explicitly.

### Data Normalization

Prefer:

1. normalized enums where practical
2. multi-select arrays for license and certification collections
3. explicit boolean fields for autonomy and authority questions
4. text only where the domain is too open-ended for a controlled option set

## Admin and Reporting Implications

### Analyst View

The admin dashboard should eventually support filtering and grouping by the new dimensions:

1. state
2. license type
3. board certification
4. prescriptive authority
5. injector status
6. autonomy level
7. practice structure
8. ownership status

### Launch Reporting Rule

Even after the schema broadens, the first public/internal analysis priority should remain Massachusetts-first.

That means the admin experience should make it easy to:

1. isolate Massachusetts responses
2. compare Massachusetts-only cohorts
3. later compare Massachusetts with cross-state groups

## Privacy Implications

The deeper respondent profile increases sensitivity slightly, so privacy messaging must remain strong.

### Continue to State Clearly

1. responses are confidential
2. names are not required
3. results are published only in aggregate
4. very small groups may be suppressed
5. employers are not notified
6. subscriber email remains stored separately

### Additional Privacy Consideration

Because credentials and state data can narrow identifiable cohorts, the aggregation and small-group suppression rules become even more important and should remain explicit in the privacy language and future reporting logic.

## Implementation Boundaries

### Included In The Next Build Pass

1. brand rename from Aesthetic Workforce to Aesthetic Career Club
2. public copy updates needed to support the new brand
3. Massachusetts-first but broader-ready positioning changes
4. deep credentials and licensure expansion in the survey model
5. geography model expansion beyond Massachusetts-only assumptions
6. matching validation, persistence, and admin schema changes as needed

### Not Included Yet

1. public national marketing positioning
2. multiple public state report pages
3. a full national landing page rewrite
4. public cross-state benchmark browsing

## Open Assumptions

1. Massachusetts remains the current flagship benchmark product at launch.
2. The broader brand should be visible immediately.
3. The data model should be built for future national use now.
4. The deeper respondent profile is worth a somewhat longer survey because the analytical value is materially higher.
5. Mobile UX must still remain calm and conversational even as the survey gets deeper.

## Spec Self-Review

### Placeholder Check

No unresolved placeholders remain. The expanded credential fields are intentionally described conceptually so the next implementation plan can translate them into exact question and schema names.

### Consistency Check

This update consistently applies the same strategy throughout:

1. broader brand now
2. Massachusetts-first public launch
3. deeper survey now
4. broader data model now

### Scope Check

This is still a single coherent design update rather than a brand-new product. It changes brand, positioning, and survey depth, but it stays within the same platform, report, and architecture direction.

### Ambiguity Check

Potential ambiguities have been resolved as follows:

1. the public homepage remains Massachusetts-first
2. the brand becomes Aesthetic Career Club now
3. the backend and survey become broader now
4. the credentials expansion should be deep, not lean or balanced
