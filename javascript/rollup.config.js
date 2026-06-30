import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function inlineJson() {
  const dataPath = resolve('./data/pincode.json');
  const data = readFileSync(dataPath, 'utf8');
  return {
    name: 'inline-json',
    resolveId(id) {
      if (id === 'pincode-data') return id;
    },
    load(id) {
      if (id === 'pincode-data') return `export default ${data};`;
    }
  };
}

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.js', format: 'cjs', sourcemap: true },
    { file: 'dist/index.mjs', format: 'es', sourcemap: true }
  ],
  plugins: [
    nodeResolve(),
    inlineJson(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser()
  ]
}; 