var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');

// --- Basic Tasks ---


// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'templates'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("jade/**/*.jade", ['templates']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('templates', function() {
    return gulp.src('./jade/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
