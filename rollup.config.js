import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs({
    }),
    json()
  ],
  // External packages that shouldn't be bundled
  external: [
    'content-type',
    'express',
    'node:crypto',
    'node:*',
    'http',
    'https',
    'path',
    'fs',
    'url',
    'util',
    'assert',
    'stream',
    'events',
    'zlib',
    'statuses'
  ]
};