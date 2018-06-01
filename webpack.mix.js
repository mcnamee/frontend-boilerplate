const mix = require('laravel-mix');

mix
  .js('src/assets/js/app.js', 'dist')
  .sass('src/assets/scss/app.scss', 'dist')
  .copy('src/index.html', 'dist')
  .copyDirectory('src/assets/images', 'dist/images')
  .browserSync('frontend-boilerplate.localhost')
  .setPublicPath('dist');
