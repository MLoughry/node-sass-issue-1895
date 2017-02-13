const build = require('./build/index');
const gulp = require('gulp');
const fs = require('fs');

const entry = {
    'main': [
        'main'
    ],
};

build.initialize({
    gulpInstance: gulp,
    entry: entry,
});