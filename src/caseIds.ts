/**
 * Fixture ids from Tracera MCP setup (project «GitHub Actions CI Lab» = 50).
 * Re-seed / recreate → update these numbers (see CASE_IDS.md).
 */
export const LAB_PROJECT_ID = 50;

/** Bound happy-path cases (group «CI smoke»). */
export const SMOKE = {
  passA: 383,
  passB: 384,
  fail: 385,
  skip: 386,
} as const;

/**
 * Edge bind targets.
 * - archived: soft-deleted in Lab (still has an id)
 * - purged: hard-removed after archive (id must not resolve)
 * - otherProject: live case in project 51 «Other Project CI IDs»
 * - missing: never existed
 * - invalid: not a positive case id (typed API is `number`)
 */
export const EDGE = {
  archived: 387,
  purged: 388,
  otherProject: 382,
  missing: 9_999_999_999,
  invalid: 0,
} as const;
