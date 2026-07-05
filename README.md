# GradeSprint GCSE Mock + Revision Platform

GradeSprint is a polished GCSE prototype for: **Take a mock. Get a report. Fix your weak topics.**

## Run
```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Built routes
Public routes include `/`, `/gcse`, `/gcse/maths`, `/gcse/science`, `/gcse/english`, `/mocks`, `/diagnostic`, `/sprints`, `/free-resources`, `/tuition`, `/pricing`, `/reports/sample`, `/about`, `/contact`.

Mock flow routes include `/mocks/[id]`, `/mocks/[id]/start`, `/mocks/[id]/review`.

Admin prototype routes include `/admin`, `/admin/questions`, `/admin/mocks`, `/admin/mock-builder`, `/admin/reports`.

## Data
Local data lives in `data/`: questions, mocks, sprints, resources, pricing, FAQs and sample attempts. `data/questions.ts` seeds 127 GCSE-style questions with the full schema, including 70 Maths and 57 Science questions.

## Extending
Add questions to `data/questions.ts`, then compose mock IDs in `data/mocks.ts`. Scoring and recommendations live in `lib/`.
