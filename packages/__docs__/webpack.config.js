/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const path = require('path')

const ENV = process.env.NODE_ENV
const DEBUG = Boolean(process.env.DEBUG) || ENV === 'development'

const outputPath = path.resolve(__dirname, '__build__')

module.exports = {
  cache: DEBUG,
  bail: !DEBUG,
  entry: {
    // Note: these entries have to keep these names so that old codepens still work
    common: [
      '@instructure/ui-polyfill-loader!',
      'react',
      'react-dom'
    ],
    globals: './globals.js'
  },
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  devServer: {
    disableHostCheck: true,
    contentBase: outputPath,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: require('@instructure/ui-presets/webpack/module/rules')
  },
  plugins: require('./plugins'),
  // eslint-disable-next-line no-undefined
  resolve: DEBUG ? require('./resolve') : undefined,
  // eslint-disable-next-line no-undefined
  resolveLoader: require('@instructure/ui-presets/webpack/resolveLoader'),
  devtool: 'cheap-module-source-map'
}
