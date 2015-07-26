var gulp = require('gulp'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
	less = require('gulp-less'),
  swig = require('gulp-swig'),
	path = require('path'),
  rev = require('gulp-rev'),
	minifyCSS = require('gulp-minify-css'),
  rjs = require('gulp-requirejs'),
	concat = require('gulp-concat'),
  gutil = require('gulp-util'),
  minifyHTML = require('gulp-minify-html');


// Optimization

gulp.task('minify-html', function() {
  var opts = {comments:false,spare:true};
  gulp.src('./public/js/app/templates/**/*.html')
    // .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./public/assets/dist/js/templates'));
});


// Compile LESS to CSS

gulp.task('less', function () {

  var l = less({paths: [ path.join(__dirname, 'less', 'includes') ]});
  l.on('error',function(e){
    gutil.log(e);
    l.end();
  });
  return gulp.src('./public/js/less/*.less')
    .pipe(l)
    .pipe(gulp.dest('./public/assets/css'));
});

// Requirejs Compile

gulp.task('compile-js', function(){
  rjs({
      baseUrl: './public/js/app/',
      out: 'main-built.js',
      name: 'config',
      optimize: true,
      mainConfigFile: './public/js/app/config.js',
      paths: {
        io: "empty:"
      }
  })
  .pipe(gulp.dest('./public/assets/dist/js')); // pipe it to the output DIR
});

// Minify CSS

gulp.task('minify-css', function() {
  gulp.src(['./public/assets/css/style.css', './public/assets/css/admin.css', './public/assets/css/smoothness/jquery-ui-1.10.4.custom.css', './public/assets/css/magnific-popup.css', './public/js/lib/select2/select2.css', './public/js/lib/select2/select2-bootstrap.css', './public/assets/css/trumbowyg/trumbowyg.css', './public/js/app/libs/cropper/dist/cropper.css'])
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(concat('musikdk.min.css'))
    .pipe(gulp.dest('./public/assets/dist/css'))
});

gulp.task('initial-setup', function(){

  gulp.src(['views/*.html'])
    .pipe(swig())
    .pipe(gulp.dest('./public/'))

});

// DEV Webserver
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: 'public',
    port: 3000,
    fallback: 'public/index.html'
  });
});

// Watcher
gulp.task('watch', function() {
  gulp.watch('./public/js/less/*.less', ['less']);
});
// LiveReload
gulp.task('livereload', function() {
  watch(['./public/assets/css/*.css', './public/js/app/**/*.js', './public/js/app/templates/**/*.html'])
    .pipe(connect.reload());
});

gulp.task('build', ['less', 'minify-css', 'compile-js', 'minify-html']);
gulp.task('default', ['initial-setup', 'webserver', 'livereload', 'watch']);

