import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.js', format: 'cjs', sourcemap: true },
    { file: 'dist/index.mjs', format: 'es', sourcemap: true }
  ],
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    terser()
  ]
}; 