const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('default',()=>{});

gulp.watch('./src/*.js', ()=>{
	console.log('build complete')
	return browserify({
		entries: ['./src/chat-src.js']
	})
	.transform(babelify, {
		presets: ['es2015']
	})  //使用babel转换es6代码
	.bundle()  //合并打包
	.pipe(source('./chat.js'))  //将常规流转换为包含Stream的vinyl对象，并且重命名
	.pipe(buffer())  //将vinyl对象内容中的Stream转换为Buffer
	.pipe(uglify())
	.pipe(gulp.dest('./dist/'))
})