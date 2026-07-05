# GradeSprint GCSE Mock + Revision Platform

GradeSprint is a polished GCSE prototype for: **Take a mock. Get a report. Fix your weak topics.**

## Requirements
- Node.js 20.x (`.nvmrc` is included)
- npm 10+

## Install once
```bash
npm install
```

## Run locally
```bash
npm run dev
```
Open `http://localhost:3000`.

## Checks
```bash
npm run lint
npm run typecheck
npm run build
```

## Built routes
Public routes include `/`, `/gcse`, `/gcse/maths`, `/gcse/science`, `/gcse/english`, `/mocks`, `/diagnostic`, `/sprints`, `/free-resources`, `/tuition`, `/pricing`, `/reports/sample`, `/about`, `/contact`.

Mock flow routes include `/mocks/[id]`, `/mocks/[id]/start`, `/mocks/[id]/review`.

Admin prototype routes include `/admin`, `/admin/questions`, `/admin/mocks`, `/admin/mock-builder`, `/admin/reports`.

## Data
Local data lives in `data/`: questions, mocks, sprints, resources, pricing, FAQs and sample attempts. `data/questions.ts` seeds GCSE-style original questions across Maths, Science, English, Geography, Economics, German and Design Technology.

## Copyright and official-paper policy
Do not paste official past-paper stems, source inserts, diagrams, datasets, mark schemes or distinctive scenarios into this repo. The question bank is original GCSE-style practice mapped to public specification topic areas. Use official specifications for topic coverage only, then write fresh contexts, values, diagrams and marking points.

## Extending
Add questions to `data/questions.ts`, then compose mock IDs in `data/mocks.ts`. Scoring and recommendations live in `lib/`. Use `UX_FUNCTIONALITY_BACKLOG.md` for the 100-point improvement roadmap.
