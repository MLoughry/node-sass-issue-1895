"use strict";
const clean = require("gulp-clean");
const path = require("path");
const taskSequence_1 = require("../utils/taskSequence");
const merge = require("merge2");
const webpack = require("webpack");
const webpack_config_1 = require("../config/webpack.config");
const options_1 = require("../options");
const compileWithTsc_1 = require("../utils/compileWithTsc");
const gulp = options_1.default.gulpInstance;

gulp.task('build:clean', function () {
    return merge([
        gulp.src("*", { cwd: 'dist', read: false }).pipe(clean()),
        gulp.src("*", { cwd: 'obj', read: false }).pipe(clean())
    ]);
});
gulp.task('build:resources', ['build:clean'], function () {
    return merge([
        gulp.src('resources/**/*.*').pipe(gulp.dest(path.join(options_1.default.outDir, 'resources'))),
        gulp.src(['packages/**/*.+(scss|json|js|css)']).pipe(gulp.dest('obj'))
    ]);
});
gulp.task('build:webpack', function (done) {
    // returns a Compiler instance
    return webpack(webpack_config_1.default(), function (err, stats) {
        if (err) {
            return done(err);
        }
        if (stats.hasErrors()) {
            return done(stats.toString("errors-only"));
        }
        var assetJson = stats.toJson({ assets: true });
        for (var ii = 0; ii < assetJson.assets.length; ii++) {
            buildInfo["s_" + assetJson.assets[ii].name] = assetJson.assets[ii].size;
        }
        return done();
    });
});
gulp.task('build:source', function (done) {
    let compileHandle = compileWithTsc_1.default({ watch: false });
    compileHandle.on('compiled', function (errors) {
        done(errors);
    });
});
taskSequence_1.setTaskSequence('build:bundle', ['build:clean',
    ['build:resources', 'build:source'],
    'build:webpack',
]);
gulp.task('build:bundle', function (done) {
    return taskSequence_1.runTaskSequence('build:bundle', done);
});
taskSequence_1.setTaskSequence('build', ['build:bundle']);
gulp.task('build', function (done) {
    return taskSequence_1.runTaskSequence('build', done);
});
