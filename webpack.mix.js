const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');

mix
  .js('src/assets/js/app.js', 'dist')
  .sass('src/assets/scss/app.scss', 'dist')
  .copy('src/index.html', 'dist')
  .copyDirectory('src/assets/images', 'dist/images')
  .webpackConfig({ plugins: [new LiveReloadPlugin()] })
  .setPublicPath('dist');
