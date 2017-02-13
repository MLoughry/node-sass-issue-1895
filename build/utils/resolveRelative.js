"use strict";
const path = require("path");
const fs = require("fs");
const trueCasePathSync_1 = require("./trueCasePathSync");
let cwd = process.cwd();
while (!fs.existsSync(path.join(cwd, 'package.json'))) {
    cwd = path.dirname(cwd);
}
function resolveRelative(relativePath = '') {
    return path.join(trueCasePathSync_1.default(path.resolve(cwd)), relativePath);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resolveRelative;
