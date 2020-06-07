import { createEntries } from './rollup.config'

// createEntries 函数用于创建入口数组，最后导出的是一个包含多个入口的一个数组
export default createEntries([
  { input: 'src/index.js', file: 'dist/vuex.esm.browser.js', format: 'es', browser: true, transpile: false, env: 'development' },
  { input: 'src/index.js', file: 'dist/vuex.esm.browser.min.js', format: 'es', browser: true, transpile: false, minify: true, env: 'production' },
  { input: 'src/index.js', file: 'dist/vuex.esm.js', format: 'es', env: 'development' },
  { input: 'src/index.cjs.js', file: 'dist/vuex.js', format: 'umd', env: 'development' },
  { input: 'src/index.cjs.js', file: 'dist/vuex.min.js', format: 'umd', minify: true, env: 'production' },
  { input: 'src/index.cjs.js', file: 'dist/vuex.common.js', format: 'cjs', env: 'development' }
])
