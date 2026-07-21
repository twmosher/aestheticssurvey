# Aesthetic Career Club

Editorial landing page and dedicated survey flow for the **2026 Massachusetts Aesthetic Compensation Report**.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zod validation
- Supabase persistence
- Resend confirmation email support
- Vercel deployment

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file and fill in your values:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Environment variables

Required:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAIL_DOMAIN`
- `CONTACT_EMAIL`

Optional:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

If `RESEND_API_KEY` is set, `RESEND_FROM_EMAIL` must also be set.

## Supabase setup

1. Create a new Supabase project.
2. Run the SQL migration in [supabase/migrations/20260720_001_initial_aesthetic_career_club.sql](/Users/tylermosher/Documents/Codex/2026-07-14/build-and-deploy-a-polished-production/.worktrees/aesthetic-workforce-build/supabase/migrations/20260720_001_initial_aesthetic_career_club.sql).
3. Copy the project URL, anon key, and service role key into your local and Vercel environments.

The public site writes anonymous survey responses and subscriber records through server-side routes. Subscriber email data is stored separately from the main survey response table.

## Vercel deployment

1. Link or import the repository into Vercel.
2. Add the same environment variables from `.env.local` to the Vercel project.
3. Redeploy after saving the environment variables.

Useful commands:

```bash
npx vercel
npx vercel env add
npx vercel --prod
```

The current linked Vercel project name is `aesthetic-career-club`.

## Testing

Run the unit test suite:

```bash
npm test
```

Run a production build check:

```bash
npm run build
```

## Manual setup still required

- Add real Supabase credentials to Vercel before live survey submissions can be stored.
- Add a real `CONTACT_EMAIL`.
- Add Resend credentials if you want confirmation emails enabled.
- Configure any admin authentication workflow before exposing admin analytics publicly.
