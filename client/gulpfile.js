'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    filter = require('gulp-filter'),
    gutil = require('gulp-util'),
    tinylr = require('tiny-lr'),
    embedlr = require('gulp-embedlr'),
    usemin = require('gulp-usemin'),
    ngmin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    concat = require('gulp-concat'),
    ngHtml2Js = require('gulp-ng-html2js'),
    imagemin = require('gulp-imagemin'),
    includeSources = require('gulp-include-source'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    karma = require('karma').server,
    _ = require('lodash'),
    fs = require('fs'),
    LIVE_RELOAD_PORT = 35740;

var paths = {
  src: {
    index : 'index.tpl.html',
    js : 'js/**/*.js',
    style : 'style/**/*.css',
    vendorScripts : 'vendorScripts',
    vendorStyles : 'vendorStyles',
    vendorAssets : 'vendorAssets',
    templates : 'templates/**/*.tpl.html',
    images : 'img/**/*'
  },
  dest: {
    index : 'build/index.html',
    indexPath : 'build/',
    js : 'build/js/**/*.js',
    jsPath : 'build/js/',
    build : 'build/',
    images : 'build/img',
    style : 'build/style',
    all : 'build/**/*'
  }
};

/*******
** BUILD TASKS
***/

function buildHtmlIncludes() {
  return gulp.src( paths.src.index )
    .pipe( includeSources({ cwd : paths.dest.build }) )
    .pipe( rename('index.html') )
    .pipe( gulp.dest( paths.dest.indexPath ) );
}
gulp.task('html-includes', ['templates'], buildHtmlIncludes);

function buildTemplates() {
  return gulp.src( paths.src.templates )
    .pipe( minifyHtml({ empty: true, conditionals: true, spare: true, quotes: true }) )
    .pipe( ngHtml2Js({ moduleName: 'appTemplates', prefix: 'templates/' }) )
    .pipe( concat('app/templates.js') )
    .pipe( gulp.dest( paths.dest.jsPath ) );
}
gulp.task('templates', ['clean'], buildTemplates);

function getKarmaConf() {

  var karmaConf = require('./karma.conf.js');
  karmaConf({ LOG_INFO : 'info', set : function(config){ karmaConf = config; } });
  var vendorScripts = fs.readFileSync( paths.src.vendorScripts ).toString().split('\n');

  karmaConf = _.extend(karmaConf, {

    files : vendorScripts.concat([
      'bower_components/angular-mocks/angular-mocks.js',
      paths.dest.js
    ])

  });

  return karmaConf;
}

function buildTest(done) {
  karma.start( getKarmaConf(), done );
}
gulp.task('test', ['copy-assets', 'templates'], buildTest);

function buildClean() {
  return gulp.src( paths.dest.build , {read: false} )
    .pipe( clean() );
}
gulp.task('clean', buildClean);

function buildCompressImages() {
  return gulp.src( paths.src.images )
    .pipe( imagemin() )
    .pipe( gulp.dest( paths.dest.images ) );
}
gulp.task('compress-images', ['clean'], buildCompressImages);

function getAssets() {

  var assets = {};
  assets[ paths.src.style ] = paths.dest.style;
  assets[ paths.src.js ] = paths.dest.jsPath;

  var vendorAssets = fs.readFileSync( paths.src.vendorAssets ).toString().split('\n');
  _.each(vendorAssets, function(asset){ var parts = asset.split('='); assets[parts[0]] = parts[1]; });

  return assets;
}

function buildCopyAssets() {

  var chain = null;

  _.each(getAssets(), function(dest, src) {
    chain = gulp.src( src )
      .pipe( gulp.dest( dest ) );
  });

  return chain;
}
gulp.task('copy-assets', ['clean'], buildCopyAssets);

function buildCompressCode() {
  return gulp.src( paths.dest.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat', rev() ],
      html: [ minifyHtml({ empty: true, conditionals: true, spare: true, quotes: true }) ],
      js: [ ngmin(), uglify({ outSourceMap: false }), rev() ]
    }))
    .pipe( gulp.dest( paths.dest.build ) );
}
gulp.task('compress-code', ['clean', 'templates', 'test', 'html-includes', 'copy-assets'], buildCompressCode);

function buildCleanTemp() {
  return gulp.src([paths.dest.jsPath, paths.dest.style], {read: false})
    .pipe( clean() );
}
gulp.task('build', ['clean', 'html-includes', 'templates', 'test', 'compress-images', 'compress-code'], buildCleanTemp);

/*******
** DEV TASKS
***/

gulp.task('dev-html-includes', ['dev-templates'], buildHtmlIncludes);

gulp.task('dev-templates', buildTemplates);

function devHtmlLivereload() {
  return gulp.src( paths.dest.index )
    .pipe( embedlr({ port : LIVE_RELOAD_PORT }) )
    .pipe( gulp.dest( paths.dest.indexPath ) );
}
gulp.task('dev-html-livereload', ['dev-html-includes'], devHtmlLivereload);

gulp.task('dev-copy-assets', buildCopyAssets);

function filterDeleted(renameFunction) {

  renameFunction = renameFunction || function(filePath) { return filePath; };

  return function (file) {

    if( file.event === 'deleted' ) {

      var fileToRemove = renameFunction(file.path);
      gutil.log( 'Removing file : ' + fileToRemove );
      fs.unlink(fileToRemove);
      return false;
    }

    return true;
  };
}

var livereloadTasks = ['dev-html-includes', 'dev-html-livereload', 'dev-templates'];
var initialLivereloadTasks = livereloadTasks.concat([ 'dev-copy-assets' ]);

gulp.task('default', initialLivereloadTasks, function() {

  var lr = tinylr();
  lr.listen(LIVE_RELOAD_PORT);

  gulp.watch([
    paths.src.index,
    paths.src.vendorScripts,
    paths.src.vendorStyles,
    paths.src.templates
  ], livereloadTasks).on('change', function(e) {
    gutil.log( gutil.colors.magenta( _.last(e.path.split('/')) ) + ' was changed' );
  });

  _.each(['js', 'style', 'img'], function(path) {
    watch({ glob: path + '/**/*' })
      .pipe( filter(filterDeleted( function (filePath) {
        return filePath.replace(/\/client\//, '/client/build/');
      })) )
      .pipe( gulp.dest('build/' + path + '/') );
  });

  gulp.watch(paths.dest.all).on('change', _.debounce(function(e) {
    lr.changed({ body: { files: [require('path').relative(__dirname, e.path)] } });
  }, 200));

  gulp.watch(paths.dest.js).on('change', _.debounce(function() {
    karma.start( getKarmaConf(), function(){ /* Don't stop watching */ } );
  }, 200));

});