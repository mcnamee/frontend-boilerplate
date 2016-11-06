/*  Load plugins
    ************************* */
  import autoprefixer from 'gulp-autoprefixer';
  import babel from 'gulp-babel';
  import browserSync from 'browser-sync';
  import concat from 'gulp-concat';
  import del from 'del';
  import eslint from 'gulp-eslint';
  import ftp from 'vinyl-ftp';
  import gulp from 'gulp';
  import htmlmin from 'gulp-htmlmin';
  import imagemin from 'gulp-imagemin';
  import minifycss from 'gulp-clean-css';
  import { output as pagespeed } from 'psi';
  import runSequence from 'run-sequence';
  import sass from 'gulp-sass';
  import sourcemaps from 'gulp-sourcemaps';
  import uglify from 'gulp-uglify';

  import ftpCredentials from './ftp-credentials';

  const reload = browserSync.reload;

/*  Clean the /dist directory (gulp clean)
  ************************* */
  gulp.task('clean', () => del(['dist']));

/*  Copy specific files to dist (gulp copy)
  - eg. fonts, server config etc
  ************************* */
  gulp.task('copy', () => {
    // Server config
    gulp.src([
      'src/.htaccess',
    ]).pipe(gulp.dest('dist'));

    // Fonts
    gulp.src([
      'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
    ]).pipe(gulp.dest('dist/assets/fonts'));
  });

/*  Optimize Images (gulp images)
  - Optimizes images and outputs to dist directory
  ************************* */
  gulp.task('images', () =>
    gulp.src('src/assets/img/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/assets/img'))
  );

/*  Styles (gulp styles)
  - Pre-Processes specific scss files into CSS
  - Minifies the CSS
  - Auto prefixes for vendor specificity
  - Generates source maps too
  ************************* */
  gulp.task('styles', () =>
    gulp.src(['src/assets/scss/theme.scss'])
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer({ browsers: ['last 5 versions'] }))
      .pipe(minifycss())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/assets/'))
      .pipe(reload({ stream: true }))
  );

/*  Concat and Minify JS Dependencies (gulp js-dep)
  ************************* */
  gulp.task('js-dep', () => {
    // Put any node_modules dependencies (JS) here
    const files = [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
    ];

    return gulp.src(files)
      .pipe(concat('plugins.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/'));
  });

/*  Concat and Minify Custom JS (gulp js)
  ************************* */
  gulp.task('js', () =>
    gulp.src('src/assets/js/**/*.js')
      .pipe(concat('theme.js'))
      .pipe(babel())
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/'))
  );

/*  Lint JavaScript (gulp lint)
  ************************* */
  gulp.task('lint', () =>
    gulp.src('src/assets/js/**/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
  );

/*  Minify HTML (gulp html)
  ************************* */
  gulp.task('html', () =>
    gulp.src('src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
      .pipe(gulp.dest('dist'))
  );

/*  Initial Build (gulp initialBuild)
  - Runs the tasks in a specific order
  ************************* */
  gulp.task('initialBuild', callback =>
    runSequence('clean', 'copy',
      ['images', 'styles', 'js-dep', 'js'],
      'html',
      callback
    )
  );

/*  Default task (gulp)
  - Calls initialBuild task then:
  - Starts BrowserSync
  - Watches for any scss updates, and compiles the css
  ************************* */
  gulp.task('default', ['initialBuild'], () => {
    /* Run task on updates */
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/assets/scss/**/*.scss', ['styles']);
    gulp.watch('src/assets/js/**/*.js', ['lint', 'js']);
    gulp.watch('src/assets/img/**/*', ['images']);

    /* Start BrowserSync */
    const files = [
      'dist/**/*',
    ];

    return browserSync.init(files, {
      server: { baseDir: './dist' },  // Use BrowserSync as server
      // proxy: '127.0.0.1:8060', // - OR - Proxy a web server
      port: 8080,
      open: true,
      notify: false,
    });
  });

/*  Run PageSpeed Insights (gulp pagespeed)
  - By default we use the PageSpeed Insights free (no API key) tier.
  - Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
  ************************* */
  gulp.task('pagespeed', cb =>
    // Update the below URL to the public URL of your site
    pagespeed('mcnamee.co', {
      strategy: 'mobile',
      // key: 'YOUR_API_KEY',
    }, cb)
  );

/*  Deploy (gulp deploy)
  - Calls initialBuild task then:
  - FTPs to server
  ************************* */
  gulp.task('deploy', callback =>
    runSequence('initialBuild', 'ftp', callback)
  );

/*  FTPs (gulp ftp)
  - Use the 'deploy' task instead of this
    so that the files are built before uploading
  ************************* */
  gulp.task('ftp', () => {
    // Rename ftp-credentials-SAMPLE.js to ftp-credentials.js
    // and add your FTP connection details to it

    try {
      // Setup the connection
      const conn = ftp.create(ftpCredentials);

      // The files to upload
      const toUpload = [
        'dist/**',
        'dist/.htaccess',
      ];

      return gulp.src(toUpload, { base: 'dist', buffer: false })
        .pipe(conn.newer('/public_html')) // only upload newer files
        .pipe(conn.dest('/public_html'));
    } catch (error) {
      return console.log(`
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
