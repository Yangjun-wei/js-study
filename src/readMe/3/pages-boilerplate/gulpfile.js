// 实现这个项目的构建任务
const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
const bs = browserSync.create();

const clean = () => {
  return del(['dist', 'temp']);
};

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass())
    .pipe(dest('temp'));
};

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'));
};

const page = () => {
  del(['dist/partials/**']);
  return src('src/**/*.html', { base: 'src' })
    .pipe(plugins.swig({ data: {}, defaults: { cache: false } }))
    .pipe(dest('temp'));
};

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
};

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'));
};

const extra = () => {
  return src('public/**', { base: 'public' }).pipe(dest('dist'));
};

const serve = () => {
  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', script);
  watch('src/**/*.html', page);
  watch(
    ['src/assets/images/**', 'src/assets/fonts/**', 'public/**'],
    bs.reload,
  );

  bs.init({
    notify: false,
    port: 2080,
    // open: false,
    files: 'dist/**',
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
  });
};

const useref = () => {
  return src('temp/**/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true,
          minifyCss: true,
          minifyJs: true,
        }),
      ),
    )
    .pipe(dest('dist'));
};

const compile = series(parallel(style, script, page), useref);

const build = series(clean, parallel(compile, useref, image, font, extra));
const develop = series(clean, compile, serve);

module.exports = { develop, build, clean };
