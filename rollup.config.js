import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import VuePlugin from 'rollup-plugin-vue'
import pkg from './package.json'

const input = 'src/components/index.js'
const external = ['vue']
const outputPath = `dist/${pkg.name}`

export default [
  {
    input,
    external,
    output: [
      {
        name: 'VueScrollDetect',
        file: `${outputPath}.umd.js`,
        format: 'umd'
      },
      {
        name: 'VueScrollDetect',
        sourcemap: true,
        file: `${outputPath}.umd.min.js`,
        format: 'umd'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      VuePlugin(),
      terser({
        include: [/^.+\.min\.js$/]
      }),
      babel({ runtimeHelpers: true })
    ]
  }
]
