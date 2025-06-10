import path from 'node:path'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/node.ts'],
  format: ['cjs', 'esm'],
  outDir: path.resolve(__dirname, './node'),
  dts: true,
  external: ['vitepress'],
  silent: true,
})
