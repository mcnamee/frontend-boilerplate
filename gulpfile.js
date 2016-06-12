/*!
 * gulp
 * $ sudo npm install del gulp bower-files gulp-concat gulp-sourcemaps gulp-sass gulp-minify-css gulp-autoprefixer browser-sync gulp-uglify gulp-imagemin gulp-htmlmin run-sequence vinyl-ftp --save
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
        htmlmin = require('gulp-htmlmin'),
        runSequence = require('run-sequence'),
        browserSync = require('browser-sync'),
        ftp = require('vinyl-ftp'),
        reload = browserSync.reload;

/*  Clean the /dist directory (gulp clean)
    ************************* */
    gulp.task('clean', function() {
      return del(['dist']);
    });

/*  Copy specific files to dist (gulp copy)
    - eg. fonts, server config etc
    ************************* */
    gulp.task('copy', function() {
      // Server config
      gulp.src([
          'src/.htaccess',
        ]).pipe(gulp.dest('dist'));

      // Fonts
      gulp.src([
          'bower_components/bootstrap-sass/assets/fonts/bootstrap/*'
        ]).pipe(gulp.dest('dist/assets/fonts'));
    });

/*  Optimize Images (gulp images)
    - Optimizes images and outputs to dist directory
    ************************* */
    gulp.task('images', function() {
      return gulp.src('src/assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/img'))
    });

/*  Styles (gulp styles)
    - Pre-Processes specific scss files into CSS
    - Minifies the CSS
    - Auto prefixes for vendor specificity
    - Generates source maps too
    ************************* */
    gulp.task('styles', function() {
      return gulp.src(['src/assets/scss/theme.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 5 versions'] }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/assets/'))
        .pipe(reload({ stream: true }));
    });

/*  Concat and Minify JS (gulp js)
    - Looks for all bower components + src/assets/js files
    ************************* */
    gulp.task('js', function () {
      // All Bower main JS files
      var files = bowerLib.ext('js').files;

      // All src/assets/js files
      files.push('src/assets/js/**/*.js');

      return gulp.src(files)
        .pipe(concat('theme.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/'));
    });

/*  Minify HTML (gulp html)
    ************************* */
    gulp.task('html', function() {
      return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
    });

/*  Initial Build (gulp initialBuild)
    - Runs the tasks in a specific order
    ************************* */
    gulp.task('initialBuild', function(callback) {
      runSequence('clean', 'copy',
                  ['images', 'styles', 'js'],
                  'html',
                  callback);
    });

/*  Default task (gulp)
    - Calls initialBuild task then:
    - Starts BrowserSync
    - Watches for any scss updates, and compiles the css
    ************************* */
    gulp.task('default', ['initialBuild'], function() {
      /* Start BrowserSync */
      var files = [
        'dist/**/*',
      ];

      browserSync.init(files, {
        server: { baseDir: "./dist" },  // Use BrowserSync as server
        // proxy: '127.0.0.1:8060', // - OR - Proxy a web server
        port: 8080,
        open: true,
        notify: false
      });

      /* Run task on updates */
      gulp.watch('src/**/*.html', ['html']);
      gulp.watch('src/assets/scss/**/*.scss', ['styles']);
      gulp.watch('src/assets/js/**/*.js', ['js']);
      gulp.watch('src/assets/img/**/*', ['images']);
    });

/*  Deploy (gulp deploy)
    - Calls initialBuild task then:
    - FTPs to server
    ************************* */
    gulp.task('deploy', function(callback) {
      runSequence('initialBuild', 'ftp', callback);
    });

/*  FTPs (gulp ftp)
    - Use the 'deploy' task instead of this
      so that the files are built before uploading
    ************************* */
    gulp.task( 'ftp', function () {
      // Rename ftp-credentials-SAMPLE.js to ftp-credentials.js and add your FTP connection details to it
      var ftpCredentials;

      try {
        ftpCredentials = require('./ftp-credentials.js');

        // Setup the connection
        var conn = ftp.create(ftpCredentials);

        // The files to upload
        var toUpload = [
            'dist/**',
        ];

        return gulp.src( toUpload, { base: '.', buffer: false } )
          .pipe( conn.newer( '/public_html' ) ) // only upload newer files
          .pipe( conn.dest( '/public_html' ) );

      } catch (error) {
        console.log(`
          ======================================================
          ======================= ERROR ========================
          ======================================================

          Rename ftp-credentials-SAMPLE.js to ftp-credentials.js and
          add your FTP connection details to it.

          ======================================================
          ======================= ERROR ========================
          ======================================================
        `);
      }
    });
