import { expect, test } from 'vitest';
import { annotations, tracera } from '@tracera/vitest';
import { EDGE, SMOKE } from './caseIds.ts';

/**
 * Mix of good binds + one unbound + one bad bind — for multi-pipeline runs.
 * Target workflow: suite-mixed.yml
 */
test(
  'mixed · pass A',
  { meta: annotations(SMOKE.passA, 'ci/mixed-pass-a') },
  async () => {
    await tracera.step('ok', async () => {
      expect([1, 2, 3]).toHaveLength(3);
    });
  },
);

test(
  'mixed · pass B',
  { meta: annotations(SMOKE.passB, 'ci/mixed-pass-b') },
  async () => {
    expect('mixed').toContain('mix');
  },
);

test('mixed · unbound', async () => {
  expect(true).toBe(true);
});

test(
  'mixed · missing id',
  { meta: annotations(EDGE.missing, 'ci/mixed-missing') },
  async () => {
    expect(1).toBe(1);
  },
);
