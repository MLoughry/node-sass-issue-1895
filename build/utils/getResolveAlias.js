"use strict";
const path = require("path");
const glob = require("glob");
const resolveRelative_1 = require("./resolveRelative");
function getResolveAlias() {
    var alias = {};
    var packages = glob.sync('packages/*/*', { cwd: resolveRelative_1.default() });
    packages.forEach(pkg => {
        pkg = pkg.replace(/^packages\//, '');
        alias[path.basename(pkg) + "/lib"] = pkg + "/lib";
        alias[path.basename(pkg)] = pkg + '/lib/index';
    });
    return alias;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getResolveAlias;
