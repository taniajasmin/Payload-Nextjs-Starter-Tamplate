import * as migration_20260913_131950_baseline from './20260913_131950_baseline';

export const migrations = [
  {
    up: migration_20260913_131950_baseline.up,
    down: migration_20260913_131950_baseline.down,
    name: '20260913_131950_baseline'
  },
];
