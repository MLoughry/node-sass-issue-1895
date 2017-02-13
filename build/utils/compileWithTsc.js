"use strict";
const EventEmitter = require("events");
const child_process_1 = require("child_process");
function compileWithTsc(options) {
    const compilerEventEmitter = new EventEmitter();
    var errors = null;
    var initialCompile = true;
    var spawnOptions = ['--max-old-space-size=4096', 'node_modules/typescript/lib/tsc.js', '--noEmitOnError'];
    if (options.watch) {
        spawnOptions.push('-w');
    }
    if (options.project) {
        spawnOptions = spawnOptions.concat(['-p', options.project]);
    }
    var child = child_process_1.spawn(process.execPath, spawnOptions);
    child.stdout.on('data', function (data) {
        if (options.watch) {
            if (initialCompile) {
                initialCompile = false;
                compilerEventEmitter.emit('initialCompile', data.toString());
            }
            else {
                compilerEventEmitter.emit('data', data.toString());
            }
        }
        else {
            errors = errors ? errors + data.toString() : data.toString();
        }
    });
    child.on('close', function () {
        compilerEventEmitter.emit('compiled', errors);
    });
    child.stderr.on('data', function (data) {
        errors = errors ? errors + data.toString() : data.toString();
    });
    return compilerEventEmitter;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compileWithTsc;
