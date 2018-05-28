// Load plugins
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import del from 'del';
import eslint from 'gulp-eslint';
import ftp from 'vinyl-ftp';
import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import minifycss from 'gulp-clean-css';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

import { scripts as webpackScripts } from './webpack.config';

const { reload } = browserSync;
const ftpCredentials = null;
// import ftpCredentials from './ftp-credentials';

/**
 * Clean the /dist directory (gulp clean)
 */
gulp.task('clean', () => del(['dist']));

/**
 * Copy specific files to dist (eg. fonts, .htaccess) (gulp copy)
 */
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

/**
 * Optimize Images (gulp images)
 */
gulp.task('images', () =>
  gulp.src('src/assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets/img')));

/**
 * Styles (processes scss) (gulp styles)
 */
gulp.task('styles', () =>
  gulp.src(['src/assets/scss/theme.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 5 versions'] }))
    .pipe(minifycss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/assets/'))
    .pipe(reload({ stream: true })));

/**
 * JavaScript (gulp js)
 */
gulp.task('js', webpackScripts);

/**
 * Lint JavaScript (gulp lint)
 */
gulp.task('lint', () =>
  gulp.src('src/assets/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format()));

/**
 * Minify HTML (gulp html)
 */
gulp.task('html', () =>
  gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist')));

/**
 * Initial Build (Runs tasks in a specific order) (gulp build)
 */
gulp.task('build', callback =>
  runSequence(
    'clean',
    'copy',
    ['images', 'js', 'styles'],
    'html',
    callback,
  ));

/**
 * Default task (gulp)
 */
gulp.task('default', ['build'], () => {
  /* Run task on updates */
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/assets/scss/**/*.scss', ['styles']);
  gulp.watch('src/assets/js/**/*.js', ['js']);
  gulp.watch('src/assets/img/**/*', ['images']);

  /* Start BrowserSync */
  const files = [
    'dist/**/*',
  ];

  return browserSync.init(files, {
    server: { baseDir: './dist' }, // Use BrowserSync as server
    // proxy: '127.0.0.1:8060', // - OR - Proxy a web server
    port: 8080,
    open: true,
    notify: false,
  });
});

/**
 * Deploy (Calls build task then FTPs to server) (gulp deploy)
 */
gulp.task('deploy', callback =>
  runSequence('build', 'ftp', callback));

/**
 * FTPs (gulp ftp)
 */
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
