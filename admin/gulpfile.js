const gulp = require('gulp');
const del = require('del');
const plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// 編譯 css
gulp.task('css', function() {
    return gulp.src([
            './source/css/font-awesome.min.css',
            './source/css/mui.min.css',
            './source/css/slick.min.css',
            './source/css/slick-theme.min.css',
            './source/css/main.css',
        ]).pipe(plugins.concatCss('all.min.css'))
        .pipe(plugins.cleanCss())
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('./public/dist/css'));
});

// 將 js 編譯成 minify
gulp.task('script', function() {
    return gulp.src('./source/js/**.js')
        .pipe(plugins.concat('all.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('fonts', function() {
    return gulp.src('./source/fonts/**.**')
        .pipe(gulp.dest('./public/dist/fonts'));
});

gulp.task('img', function() {
    return gulp.src('./source/img/**.**')
        .pipe(gulp.dest('./public/dist/img'));
});

// 清掉 dist 裡面 css 跟 js 的資料夾
gulp.task('clean', function() {
    return del(['./public/dist']);
});

gulp.task('build:prod', ['css', 'script', 'fonts', 'img']);
