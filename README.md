# github-actions-test

Lab repo to exercise **Tracera → GitHub Actions → `@tracera/vitest` → results**.

## What is here

| Workflow file | Suite | Purpose |
|---------------|-------|---------|
| `suite-smoke.yml` | `src/suite-smoke.test.ts` | Pass / fail / skip with real Lab case ids |
| `suite-edge.yml` | `src/suite-edge.test.ts` | No id, archived, purged, missing, other project, invalid `0` |
| `suite-mixed.yml` | `src/suite-mixed.test.ts` | Mix of good + unbound + missing |
| `suite-extra-1.yml` … `suite-extra-4.yml` | same as smoke | Extra Targets — header shows **3** icons + **`+N`** when ≥4 launches |

Adapter: **`@tracera/vitest`** (no browser).

Fixture ids: [CASE_IDS.md](./CASE_IDS.md) / `src/caseIds.ts` (project **50** on local Tracera).

## GitHub secrets

| Secret | Required |
|--------|----------|
| `TRACERA_AUTOTEST_TOKEN` | Autotest token from Lab project settings |

Do **not** put the Autotest token in the Tracera CI Connection — only in GitHub secrets.

## Reachability (important)

`workflow_dispatch` gets `TRACERA_BASE_URL` from Tracera (`TRACERA_PUBLIC_APP_URL`).

- **GitHub-hosted runners cannot call `http://127.0.0.1:8080`.**
- Use a tunnel (ngrok / cloudflared) and set `TRACERA_PUBLIC_APP_URL` to that HTTPS URL, **or** a self-hosted runner on the same machine as Tracera.

## Tracera CI setup (Lab project 50)

1. **Settings → CI → Connections** — Add GitHub Actions Connection (`https://api.github.com` + PAT with `actions:write` / `contents:read` as needed).
2. **Targets** (one per workflow), e.g.:

| Target name | Repository | Workflow | Ref |
|-------------|------------|----------|-----|
| Smoke | `petr-komissarov/github-actions-test` | `suite-smoke.yml` | `main` |
| Edge | same | `suite-edge.yml` | `main` |
| Mixed | same | `suite-mixed.yml` | `main` |
| Extra 1…4 | same | `suite-extra-1.yml` … `suite-extra-4.yml` | `main` |

Select **≥4** Targets on Run in CI to see header overflow (`+N`).

3. Leave Target **default params empty** (or only keys declared as `workflow_dispatch` inputs). Tracera always merges `TRACERA_TEST_RUN_ID` / `TRACERA_BASE_URL` / `TRACERA_PROJECT_ID` — those three are already declared on each workflow.
4. Create Autotest token in the Lab project → GitHub secret `TRACERA_AUTOTEST_TOKEN`.

## Manual check

1. Push this repo to `main` (workflows must exist on the default branch / Target `ref`).
2. In Tracera Lab project: select smoke cases (383–386) → **Run** → **Run in CI** → pick one or more Targets → Confirm.
3. Watch GitHub Actions; then open the run in Tracera — smoke results should appear; edge binds should not create normal results for bad ids (see job logs at `TRACERA_LOG_LEVEL=debug`).

Multi-select Targets → provider triggers run **in parallel**; each workflow attaches to the **same** `TRACERA_TEST_RUN_ID`.

## Local (optional)

```bash
cp .env.example .env
# fill TRACERA_AUTOTEST_TOKEN (+ BASE_URL / PROJECT_ID)
npm ci
npm run test:smoke
```

Omit `TRACERA_TEST_RUN_ID` to let the adapter create and finish its own run.
