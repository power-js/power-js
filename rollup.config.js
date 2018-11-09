import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import strip from 'rollup-plugin-strip';
import { uglify } from 'rollup-plugin-uglify';
const noop = () => {};

export default (args) => ({
  input: 'src/index.js',
  output: {
    format: 'umd',
    file: args.configDebug ? 'dist/power.dev.js' : 'dist/power.js',
    name: 'power',
    exports: 'named',
    strict: true
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    strip({
      debugger: true,
      functions: args.configDebug ? [] : ['console.log'],
      sourceMap: false
    }),
    eslint(),
    babel(),
    args.configDebug ? noop : uglify()
  ]
});
