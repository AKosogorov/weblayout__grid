// gulp --build - собрать релизную версию
// gulp --dev - собрать версию для разработки

const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
// const svgSprite = require('gulp-svg-sprite');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));

const pug2html = () => {
  return src('./src/pages/*.pug')
    .pipe(pug({
      pretty: true,
    }))
    .pipe(dest('src'));
};

const clean = () => {
  return del(['docs']);
};

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('docs'));
};

const fonts = () => {
  return src([
    'src/fonts/*.woff',
    'src/fonts/*.woff2'
    ])
    .pipe(dest('docs/fonts'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

// const styles = () => {
//   return src('src/styles/**/*.css')
//     .pipe(gulpif(argv.dev, sourcemaps.init()))
//     .pipe(concat('main.css'))
//     .pipe(autoprefixer({
//       cascade: false,
//     }))
//     .pipe(gulpif(argv.build, cleanCSS({
//       level: 2,
//     })))
//     .pipe(gulpif(argv.dev, sourcemaps.write()))
//     .pipe(dest('docs'))
//     .pipe(browserSync.stream());
// };

const styles = () => {
  return src('src/styles/style.scss')
    .pipe(gulpif(argv.dev, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(gulpif(argv.build, cleanCSS({
      level: 2,
    })))
    .pipe(gulpif(argv.dev, sourcemaps.write()))
    .pipe(dest('docs'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(gulpif(argv.build, htmlmin({
      collapseWhitespace: true,
    })))
    .pipe(dest('docs'))
    .pipe(gulpif(argv.dev, browserSync.stream()));
};

const images = () => {
  return src([
    'src/images/**/*.jpg',
    'src/images/**/*.webp',
    'src/images/**/*.png',
    'src/images/*.svg'
  ])
  .pipe(imageMin())
  .pipe(dest('docs/images'))
  .pipe(gulpif(argv.dev, browserSync.stream()));
};

// const svgSprites = () => {
//   return src('src/images/svg/**/*.svg')
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//           sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest('docs/images'))
// }

const scripts = () => {
  return src('src/js/**/*.js')
  .pipe(gulpif(argv.dev, sourcemaps.init()))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(gulpif(argv.build, uglify({
    toplevel: true,
  }).on('error', notify.onError())))
  .pipe(gulpif(argv.dev, sourcemaps.write()))
  .pipe(dest('docs'))
  .pipe(gulpif(argv.dev, browserSync.stream()));
};

const watchFiles = () => {
  if (argv.build) return (console.log('Сборка завершена'));

  browserSync.init({
    server: {
      baseDir: 'docs',
    },
  });
};

watch('src/pages/**/*.pug', pug2html);
watch('src/**/*.html', htmlMinify);
watch('src/styles/**/*.scss', styles);
watch([
  'src/images/**/*.jpg',
  'src/images/**/*.webp',
  'src/images/**/*.png',
  'src/images/*.svg'
  ], images);
// watch('src/images/svg/**/*.svg', svgSprites);
watch('src/js/**/*.js', scripts);
watch('src/resources/**', resources);
watch(['src/fonts/*.woff', 'src/fonts/*.woff2'], fonts);

exports.default = series(clean, resources, pug2html, htmlMinify, styles, fonts, images, scripts, watchFiles);
