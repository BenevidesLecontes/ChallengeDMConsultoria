'use strict';

const gulp = require('gulp');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const gulpNgConfig = require('gulp-ng-config');

const preset = {
    presets: ['env']
};

const path = {
    libs: './www/libs/',
    modules: './www/js/modules/',
    services: './www/js/services/',
    controllers: './www/js/controllers/',
    less: './www/less/',
    dist: './dist/',
    fontawesome: './node_modules/font-awesome/less/'
};

const libDest = `${path.dist}libs.min.js`;
const jsDest = `${path.dist}scripts.js`;
const cssDest = `${path.dist}styles.css`;

const libFiles = [
    `${path.libs}angular/angular.min.js`,
    `${path.libs}angular-route/angular-route.min.js`,
];

const jsFiles = [
    `${path.modules}**/*.js`,
    `${path.services}**/*.js`,
    `${path.controllers}**/*.js`
];

const cssFiles = [
    `${path.less}main.less`,
    `${path.fontawesome}font-awesome.less`,
];

gulp.task('clean:js', cb => {
    rimraf(jsDest, cb);
});

gulp.task('clean:css', cb => {
    rimraf(cssDest, cb);
});

gulp.task('clean:lib', cb => {
    rimraf(libDest, cb);
});

gulp.task('clean', ['clean:lib', 'clean:js', 'clean:css']);

gulp.task('min:lib', () => {
    return gulp.src(libFiles)
        .pipe(concat(libDest))
        .pipe(gulp.dest('.'));
});

gulp.task('min:js', () => {
    return gulp.src(jsFiles)
        .pipe(concat(jsDest))
        .pipe(babel(preset))
        .pipe(gulp.dest('.'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'));
});

gulp.task('min:less', () => {
    return gulp.src(cssFiles)
        .pipe(less())
        .pipe(concat(cssDest))
        .pipe(gulp.dest('.'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'));
});

gulp.task('min', ['min:lib', 'min:js', 'min:less']);

gulp.task('watch:less', () => {
    const files = [
        `${path.less}**/*.less`,
        `${path.fontawesome}**/*.less`
    ];
    return gulp.watch(files, ['min:less']);
});


gulp.task('watch:js', () => {
    const files = [
        './www/js/modules/app.js',
        `${path.services}**/*.js`,
        `${path.controllers}**/*.js`
    ];
    return gulp.watch(files, ['min:js']);
});

gulp.task('watch', ['watch:js', 'watch:less']);