import buble from '@rollup/plugin-buble'   // 编译 es6+ 以兼容 IE11
import replace from '@rollup/plugin-replace' // 可在打包是替换文件中的字符串
import resolve from '@rollup/plugin-node-resolve' // 实现 node 中 require.resolve() 中的功能， require 模块
import commonjs from '@rollup/plugin-commonjs' //可将CommonJS模块转换为ES6
import { terser } from 'rollup-plugin-terser' // 压缩插件
import pkg from './package.json'

// 引入 package.json 获取 插件版本 version 字段值，在打包的文件首行添加版本信息，日期，作者信息。
const banner = `/*!
 * vuex v${pkg.version}
 * (c) ${new Date().getFullYear()} Evan You
 * @license MIT
 */`

// 多入口创建
export function createEntries(configs) {
  return configs.map((c) => createEntry(c))
}

function createEntry(config) {
  const c = {
    input: config.input,
    plugins: [],
    output: {
      banner,
      file: config.file,
      format: config.format
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  if (config.format === 'umd') {
    c.output.name = c.output.name || 'Vuex'
  }

  // 这里就用到了 @rollup/plugin-replace 插件， 将字符串 '__VERSION__' 转化为 package.json 中配置 version加载打包后文件的头部
  c.plugins.push(replace({
    __VERSION__: pkg.version,
    __DEV__: config.format !== 'umd' && !config.browser
      ? `(process.env.NODE_ENV !== 'production')`
      : config.env !== 'production'
  }))


  if (config.transpile !== false) {
    c.plugins.push(buble())
  }

  c.plugins.push(resolve())
  c.plugins.push(commonjs())

  if (config.minify) {
    c.plugins.push(terser({ module: config.format === 'es' }))
  }

  return c
}
