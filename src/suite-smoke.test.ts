import { expect, test } from 'vitest';
import { annotations, tracera } from '@tracera/vitest';
import { SMOKE } from './caseIds.ts';

/**
 * Happy path for Tracera → GitHub Actions → Vitest → report.
 * Target workflow: suite-smoke.yml
 */
test(
  'smoke pass A',
  { meta: annotations(SMOKE.passA, 'ci/smoke-pass-a') },
  async () => {
    await tracera.step('assert truthy', async () => {
      expect(1 + 1).toBe(2);
    });
    tracera.comment('reported from suite-smoke');
  },
);

test(
  'smoke pass B',
  { meta: annotations(SMOKE.passB, 'ci/smoke-pass-b') },
  async () => {
    expect('ok').toBe('ok');
  },
);

test(
  'smoke intentional fail',
  { meta: annotations(SMOKE.fail, 'ci/smoke-fail') },
  async () => {
    await tracera.step('force fail', async () => {
      expect(true, 'intentional fail for CI lab').toBe(false);
    });
  },
);

test(
  'smoke skip',
  { meta: annotations(SMOKE.skip, 'ci/smoke-skip') },
  (ctx) => {
    ctx.skip('intentional skip for CI lab');
  },
);
