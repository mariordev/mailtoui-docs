const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const header = require('gulp-header');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/**
 * Process CSS files.
 */
function styles() {
    return gulp.src('./docs/source/css/mailtoui-docs.css')
        .pipe(cleanCss())
        .pipe(rename('./docs/assets/css/mailtoui-docs-min.css'))
        .pipe(gulp.dest('./'));
}

/**
 * Lint JavaScript files.
 */
function lintScripts() {
    return gulp.src('./docs/source/js/mailtoui-docs.js')
        .pipe(eslint())
        .pipe(eslint.format());
}

/**
 * Process JavaScript files.
 */
function scripts() {
    return browserify({
            entries: './docs/source/js/mailtoui-docs.js',
            debug: true
        })
        .bundle()
        .pipe(source('mailtoui-docs.js'))
        .pipe(buffer())
        .pipe(minify({ noSource: true }))
        .pipe(gulp.dest('./docs/assets/js'));
}

/**
 * The all seeing eye...
 */
function watchFiles() {
    gulp.watch('./docs/source/css/mailtoui-docs.css', styles);
    gulp.watch('./docs/source/js/mailtoui-docs.js', gulp.series(lintScripts, scripts));
}

/**
 * Define complex tasks.
 */
const js = gulp.series(lintScripts, scripts);
const build = gulp.parallel(styles, js);
const watch = gulp.series(build, watchFiles);

/**
 * Make tasks available to the outside world.
 */
exports.css = styles;
exports.lintJs = lintScripts;
exports.js = js;
exports.watch = watch;
exports.default = build;
