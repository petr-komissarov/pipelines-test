import { expect, test } from 'vitest';
import { annotations, tracera } from '@tracera/vitest';
import { EDGE } from './caseIds.ts';

/**
 * Bind edge cases — expect adapter to skip upload / soft-fail report
 * (debug logs when TRACERA_LOG_LEVEL=debug). Target: suite-edge.yml
 *
 * None of these should corrupt a Lab smoke run when selected alone;
 * typically you still select smoke cases in the Tracera Run, and this
 * suite only probes reporting behaviour.
 */

test('no testCaseId bind — should not upload', async () => {
  // No annotations / tracera.testCase → not reported to a case.
  expect(2 * 2).toBe(4);
  tracera.comment('unbound test body (no case id)');
});

test(
  'archived testCaseId',
  { meta: annotations(EDGE.archived, 'ci/edge-archived') },
  async () => {
    expect(true).toBe(true);
    tracera.comment('bound to archived case — should not land as a normal result');
  },
);

test(
  'purged (deleted) testCaseId',
  { meta: annotations(EDGE.purged, 'ci/edge-purged') },
  async () => {
    expect(true).toBe(true);
    tracera.comment('bound to purged case id');
  },
);

test(
  'missing testCaseId',
  { meta: annotations(EDGE.missing, 'ci/edge-missing') },
  async () => {
    expect(true).toBe(true);
    tracera.comment('bound to non-existent case id');
  },
);

test(
  'other project testCaseId',
  { meta: annotations(EDGE.otherProject, 'ci/edge-other-project') },
  async () => {
    expect(true).toBe(true);
    tracera.comment('case lives in project 51, token/project is Lab 50');
  },
);

test(
  'invalid testCaseId (0)',
  { meta: annotations(EDGE.invalid, 'ci/edge-invalid') },
  async () => {
    expect(true).toBe(true);
    tracera.comment('invalid numeric id 0');
  },
);
