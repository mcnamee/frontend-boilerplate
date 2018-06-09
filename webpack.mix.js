const mix = require('laravel-mix');

mix
  .js('src/assets/js/app.js', 'dist/js')
  .extract(['bootstrap', 'jquery', 'popper.js'])
  .sass('src/assets/scss/app.scss', 'dist/css')
  .options({ processCssUrls: false })
  .copy('src/index.html', 'dist')
  .copyDirectory('src/assets/images', 'dist/images')
  .browserSync('frontend-boilerplate.localhost')
  .setPublicPath('dist');
