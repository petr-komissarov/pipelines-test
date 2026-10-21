import { defineConfig } from 'vitest/config';
import { tracera } from '@tracera/vitest/plugin';

export default defineConfig({
  plugins: [tracera()],
  test: {
    fileParallelism: false,
    maxWorkers: 1,
    pool: 'forks',
    testTimeout: 60_000,
  },
});
