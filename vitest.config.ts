import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Setting global timeout to 10 seconds (10000ms)
    testTimeout: 15000,
  },
});