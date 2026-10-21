# Fixture case ids (local Tracera)

Prepared via Tracera MCP against the running `mise dev` instance.

| Role | Project | `rootTestCaseId` | Notes |
|------|---------|------------------|--------|
| Lab project | **50** `GitHub Actions CI Lab` | — | Root group `54` |
| Other project | **51** `Other Project CI IDs` | — | Root group `55` |
| Smoke · pass A | 50 | **383** | group `CI smoke` |
| Smoke · pass B | 50 | **384** | |
| Smoke · intentional fail | 50 | **385** | |
| Smoke · skip | 50 | **386** | |
| Fixture · archived | 50 | **387** | soft-deleted |
| Fixture · purged | 50 | **388** | archived then purged |
| Other project case | 51 | **382** | cross-project bind |

Source of truth in code: `src/caseIds.ts`. After DB reset, recreate fixtures and update that file.
