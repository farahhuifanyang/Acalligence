/*
 * @Author: your name
 * @Date: 2021-06-11 05:58:51
 * @LastEditTime: 2021-06-11 10:46:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /PCube3.0-frontend/vue.config.js
 */
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Acalligence 科技情报分析系统',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  devServer: {
    // Change default port
    port: 8081,

    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 我们的项目地址
        target: 'http://10.105.242.74:8080/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
