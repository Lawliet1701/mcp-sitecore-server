import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Setting global timeout to 25 seconds (25000ms)
    testTimeout: 25000,
  },
});