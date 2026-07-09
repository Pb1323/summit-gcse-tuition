# GradeSprint (summit-gcse-tuition) Project Context

Last updated: 2026-07-09

## Purpose

`summit-gcse-tuition/` is a separate, standalone Next.js prototype branded **"GradeSprint"** — a GCSE Maths/Science (with an English route stub) mock-exam and revision platform. Tagline: "Take a mock. Get a report. Fix your weak topics." It includes timed mock exams with navigation, score reports with grade-band estimates and weak-topic analysis, revision "sprints," a tuition-conversion marketing funnel, and an admin prototype for managing questions/mocks. It is explicitly local-only: no auth, no payments, no database.

Update this file before every push or major handoff so a new chat/model can recover the project state quickly.

## Tech Stack

- Next.js (`"latest"` in package.json — not pinned), App Router under `app/`.
- React `"latest"`, React-DOM `"latest"`, TypeScript `"latest"`.
- Tailwind CSS `"latest"` + Autoprefixer + PostCSS (all `"latest"`).
- ESLint `"latest"` + `eslint-config-next` `"latest"`.
- `package.json` has **no `name` or `version` field**, and `devDependencies` is an empty object — all deps sit under `dependencies`, all pinned to `"latest"` rather than real semver.
- **No lockfile present** (`package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` do not exist) — installs are not reproducible; the first `npm install` will resolve whatever is current at install time.
- No database, no auth provider, no payments, no `app/api` directory — confirmed no API routes exist at all.

Important: the parent repo's `AGENTS.md` warns this is a newer Next.js with breaking changes vs. training data. Read `node_modules/next/dist/docs/` (once installed) before editing Next-specific code.

## npm Scripts (verbatim from package.json)

```json
"dev": "next dev"
"build": "next build"
"lint": "next lint"
"typecheck": "tsc --noEmit"
```

## Important Routes

From `app/` structure:

- Public: `/`, `/about`, `/contact`, `/gcse`, `/gcse/maths`, `/gcse/science`, `/gcse/english`, `/diagnostic`, `/free-resources`, `/mocks`, `/pricing`, `/reports/sample`, `/sprints`, `/tuition`.
- Mock flow: `/mocks/[id]`, `/mocks/[id]/start`, `/mocks/[id]/review`.
- Admin prototype: `/admin`, `/admin/questions`, `/admin/mocks`, `/admin/mock-builder`, `/admin/reports`.
- **No `app/api` routes** — no server endpoints, no auth routes.

## Components, Data, Lib

- `components/`: `AdminMockBuilder.tsx`, `AdminQuestionBank.tsx`, `AnimatedBackground.tsx`, `Cards.tsx`, `DiagramRenderer.tsx`, `Footer.tsx`, `Header.tsx`, `MockRoom.tsx`, `QuestionNavigator.tsx`, `QuestionRenderer.tsx`, `ReviewSummary.tsx`, `Timer.tsx`.
- `data/`: `faqs.ts`, `mocks.ts`, `pricing.ts`, `questions.ts` (seeds 127 GCSE-style questions — 70 Maths, 57 Science, per README), `resources.ts`, `sampleAttempts.ts`, `types.ts` — all local static/hardcoded, no external fetching.
- `lib/`: `mockGeneration.ts`, `mockScoring.ts`, `recommendations.ts`, `topicAnalysis.ts` — pure logic for building mocks, scoring, and weak-topic recommendations.

## Design Notes

- Premium UK-education visual identity: navy / royal blue / champagne, per the planning docs.
- Product/tool first, mirroring the intent of the root Summit-Tuition app.

## Planning Docs — Important Caveat

`MOCK_SYSTEM_PLAN.md`, `NEXT_STEPS.md`, `PRODUCT_PLAN.md`, `QUESTION_SCHEMA.md`, `SPRINTS_PLAN.md`, and `TUITION_FUNNEL.md` all currently contain **the same generic boilerplate text** (only the title differs) rather than six distinct plans as their filenames imply. This looks like a generation artifact / unfinished templating pass, not real per-topic planning content. The shared boilerplate does describe: GCSE Maths/Science mocks, diagnostics, weak-topic analytics, sprints, and a tuition-conversion funnel; mock room with timer/navigation/answer-saving/flagging/review; reports with score, grade band, weaknesses, careless-mistake detection, and a 7-day plan; an admin area for question filtering and mock validation; and a "future work" list (real persistence, richer marking, account history, tutor dashboard, PDF export, payments).

**Action needed**: these six docs should be rewritten with distinct, real content per topic — flagging here rather than fixing silently, since content decisions are yours to make.

## Known Limitations

- No real authentication, sessions, database persistence, or payments — purely local/static prototype data.
- No API routes at all (`app/api` does not exist).
- No lockfile and all dependencies pinned to `"latest"` — reproducibility risk; consider pinning versions and committing a lockfile.
- `package.json` missing `name`/`version` fields.
- The six planning docs are placeholder/duplicate content (see above) and don't yet reflect real distinct plans.

## How To Run Locally

```bash
cd summit-gcse-tuition
npm install
npm run dev
```

Open `http://localhost:3000`.

**Port conflict warning**: no custom port is configured anywhere (`next.config.mjs` is an empty default config; no `-p` flag or `PORT` env var set in the `dev` script). Next.js defaults to **port 3000**, the same default as the root Summit-Tuition app. If you want to run this alongside the root app (or india-study-platform, which has previously run on port 3002 per its stray log filenames), start it on a different port explicitly:

```bash
npx next dev -p 3001
```

No environment variables or `.env` setup are needed — none are referenced anywhere in the codebase.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

On Windows, PowerShell may block `npm.ps1`; use `npm.cmd run <script>` if that happens (same issue documented in the root repo and india-study-platform).

## Files By Area

- Config: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`.
- App shell: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`.
- Mock routes: `app/mocks/*`.
- Admin routes: `app/admin/*`.
- Data: `data/*`.
- Libraries: `lib/*`.
- Components: `components/*`.
- Planning docs (currently duplicate boilerplate, see caveat above): `MOCK_SYSTEM_PLAN.md`, `NEXT_STEPS.md`, `PRODUCT_PLAN.md`, `QUESTION_SCHEMA.md`, `SPRINTS_PLAN.md`, `TUITION_FUNNEL.md`.
