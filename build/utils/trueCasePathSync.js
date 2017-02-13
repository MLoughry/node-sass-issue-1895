"use strict";
const glob = require("glob");
const path = require("path");
// From: http://stackoverflow.com/questions/33086985/how-to-obtain-case-exact-path-of-a-file-in-node-js-on-windows
// gets the path in Windows with the true case
function trueCasePathSync(fsPath) {
    // Normalize the path so as to resolve . and .. components.
    // !! As of Node v4.1.1, a path starting with ../ is NOT resolved relative
    // !! to the current dir, and glob.sync() below then fails.
    // !! When in doubt, resolve with fs.realPathSync() *beforehand*.
    var fsPathNormalized = path.normalize(fsPath);
    // OSX: HFS+ stores filenames in NFD (decomposed normal form) Unicode format,
    // so we must ensure that the input path is in that format first.
    if (process.platform === 'darwin') {
        fsPathNormalized = fsPathNormalized.normalize('NFD');
    }
    // !! Windows: Curiously, the drive component mustn't be part of a glob,
    // !! otherwise glob.sync() will invariably match nothing.
    // !! Thus, we remove the drive component and instead pass it in as the 'cwd'
    // !! (working dir.) property below.
    var pathRoot = path.parse(fsPathNormalized).root;
    var noDrivePath = fsPathNormalized.slice(Math.max(pathRoot.length - 1, 0));
    // Perform case-insensitive globbing (on Windows, relative to the drive /
    // network share) and return the 1st match, if any.
    // Fortunately, glob() with nocase case-corrects the input even if it is
    // a *literal* path.
    return glob.sync(noDrivePath, { nocase: true, cwd: pathRoot.toLowerCase() })[0];
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = trueCasePathSync;
