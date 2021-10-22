const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sourcemap = require('gulp-sourcemaps')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sync = require('browser-sync').create()

const styles = () => {
	return gulp.src('source/sass/style.scss')
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(sourcemap.write('.'))
		.pipe(gulp.dest('source/css'))
		.pipe(sync.stream())
}

exports.styles = styles

const server = (done) => {
	sync.init({
		server: {
			baseDir: 'source'
		},
		cors: true,
		notify: false,
		ui: false,
	})
	done()
}

exports.server = server

const watcher = () => {
	gulp.watch('source/sass/**/*.scss', gulp.series('styles'))
	gulp.watch('source/*.html').on('change', sync.reload)
}

exports.default = gulp.series(
	styles, server, watcher
)
