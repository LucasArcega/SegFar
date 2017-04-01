var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// Html task
gulp.task('html', function(){
    gulp.src(['*.html', 'views/*.html','views/**/*.html'])
        .pipe(reload({stream:true}))
});

// css task
gulp.task('css', function(){
    gulp.src(['*.css', 'css/*.css'])
        .pipe(reload({stream:true}))
});

// Browser task
gulp.task('browser-sync', function() {
	browserSync.init(['css/**','views/*.html','views/**/*.html' ,'*.html'], {
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });

});

// Watch task
gulp.task('watch', function(){
    gulp.watch('*.html', ['html']);
    gulp.watch('*.css', ['css']);
});

gulp.task('default', ['html','css','browser-sync', 'watch']);