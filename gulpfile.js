/*!
 * gulp
 * $ sudo npm install gulp bower-files gulp-concat gulp-sourcemaps gulp-sass gulp-minify-css gulp-autoprefixer browser-sync gulp-uglify --save
 */

/*  Load plugins
    ************************* */
    var gulp = require('gulp'),
        sourcemaps = require('gulp-sourcemaps'),
        sass = require('gulp-sass'),
        minifycss = require('gulp-clean-css'),
        autoprefixer = require('gulp-autoprefixer'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        bowerLib = require('bower-files')(),
        browserSync = require('browser-sync'),
        reload = browserSync.reload;


/*  Styles (gulp styles)
    - Pre-Processes specific scss files into CSS
    - Minifies the CSS
    - Auto prefixes for vendor specificity
    - Generates source maps too
    ************************* */
    gulp.task('styles', function() {
      gulp.src(['assets/scss/theme.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 5 versions'] }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({ stream: true }));
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

/*  Concat and Minify JS (js)
    - Looks for all bower components + assets/js files
    ************************* */
    gulp.task('js', function () {
      // All Bower main JS files
      var files = bowerLib.ext('js').files;

      // All assets/js files
      files.push('assets/js/**/*.js');

      gulp.src(files)
        .pipe(concat('theme.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
    });

/*  Default task (gulp)
    - Watches for any scss updates, and compiles the css
    ************************* */
    gulp.task('default', ['styles', 'js', 'browserSync'], function () {
        // Watch .scss files
        gulp.watch('assets/scss/**/*.scss', ['styles']);
        gulp.watch('assets/js/**/*.js', ['js']);
    });
