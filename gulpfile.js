var gulp = require('gulp');
var postcss = require('postcss');
var _postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var _import = require('postcss-import');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring'); //会去掉注释，fuck
var cssmqpacker = require('css-mqpacker');
var px2rem = require('postcss-px2rem');
var nested = require('postcss-nested');

gulp.task('postcss', function(){
  var processors = [
    _import,
    nested,
    cssmqpacker,
    px2rem({remUnit: 75}),
    autoprefixer
  ];
  return gulp.src('./css/main.css')
    .pipe(_postcss(processors))
    .on('error', errorHandler)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/dest'))
})

gulp.task('watch', function(){
  gulp.watch('./css/src/**/*.css', ['postcss']);
})

gulp.task('default', ['postcss', 'watch']);

function errorHandler(error){
  console.log(error.message);
  console.log(error.fileName);
  console.log('line:', error.line, 'column:', error.column);
  this.emit('end');
}
