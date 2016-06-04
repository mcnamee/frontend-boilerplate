/*!
 * gulp
 * $ sudo npm install del gulp bower-files gulp-concat gulp-sourcemaps gulp-sass gulp-minify-css gulp-autoprefixer browser-sync gulp-uglify gulp-imagemin --save
 */

/*  Load plugins
    ************************* */
    var del = require('del'),
        gulp = require('gulp'),
        sourcemaps = require('gulp-sourcemaps'),
        sass = require('gulp-sass'),
        minifycss = require('gulp-clean-css'),
        autoprefixer = require('gulp-autoprefixer'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        bowerLib = require('bower-files')(),
        imagemin = require('gulp-imagemin'),
        browserSync = require('browser-sync'),
        reload = browserSync.reload;

/*  Clean dist/img directory
    ************************* */
    gulp.task('clean', function() {
      del(['dist/img']);
    });

/*  Optimize Images (images)
    - Optimizes images and outputs to dist directory
    ************************* */
    gulp.task('images', ['clean'], function() {
      gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
    });

/*  Styles (gulp styles)
    - Pre-Processes specific scss files into CSS
    - Minifies the CSS
    - Auto prefixes for vendor specificity
    - Generates source maps too
    ************************* */
    gulp.task('styles', function() {
      gulp.src(['src/scss/theme.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 5 versions'] }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({ stream: true }));
    });

/*  Concat and Minify JS (js)
    - Looks for all bower components + src/js files
    ************************* */
    gulp.task('js', function () {
      // All Bower main JS files
      var files = bowerLib.ext('js').files;

      // All src/js files
      files.push('src/js/**/*.js');

      gulp.src(files)
        .pipe(concat('theme.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
    });

/*  Browser Sync (gulp browserSync)
    - Opens browser-sync watching all php and css files
    - Any change and save will auto-update in the browser
    ************************* */
    gulp.task('browserSync', function() {
      var files = [
        'dist/*',
        './**/*.php',
        './**/*.html'
      ];

      browserSync.init(files, {
        proxy: "localhost/",
        notify: false
      });
    });

/*  Default task (gulp)
    - Watches for any scss updates, and compiles the css
    ************************* */
    gulp.task('default', ['images', 'styles', 'js', 'browserSync'], function () {
        // Watch .scss files
        gulp.watch('src/scss/**/*.scss', ['styles']);
        gulp.watch('src/js/**/*.js', ['js']);
        gulp.watch('src/img/**/*', ['images']);
    });
