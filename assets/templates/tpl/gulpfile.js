var gulp = require('gulp');
var sass = require('gulp-sass');
var rigger = require('gulp-rigger');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// html build
gulp.task('html:build', function () {
    gulp.src('./src/tpl/*.html') //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('./dist/')); //Выплюнем их в папку dist
  //      .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});



// Gulp Sass Task
gulp.task('sass', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
})

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function() {
    browserSync.init(['dist/css/*.css', 'dist/js/*.js'], {
        server: {
            baseDir: './dist/'
        }
    });
});
// Create Gulp Default Task
// ------------------------
// Having watch within the task ensures that 'sass' has already ran before watching
//
// This setup is slightly different from the one on the blog post at
// http://www.zell-weekeat.com/gulp-libsass-with-susy/#comment-1910185635
gulp.task('default', ['sass', 'html:build', 'browser-sync'], function () {

     gulp.watch('./src/scss/*.scss', ['sass'], ['bs-reload'])
     /* Watch app.js file, run the scripts task on change. */
     gulp.watch(['src/js/app.js'], ['scripts'])
     /* Watch .html files, run the bs-reload task on change. */
     gulp.watch(['src/tpl/**/*.html'], ['html:build'])
     gulp.watch(['dist/*.html'], ['bs-reload']);

});

