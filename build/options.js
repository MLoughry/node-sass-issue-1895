"use strict";
const resolveRelative_1 = require("./utils/resolveRelative");
const parseArgs_1 = require("./utils/parseArgs");
let options = {
    outDir: resolveRelative_1.default('dist'),
    gulpInstance: null,
    entry: null,
};
function setOptions(newOptions) {
    Object.assign(options, newOptions);
}
exports.setOptions = setOptions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = options;
