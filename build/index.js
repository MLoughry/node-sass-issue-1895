"use strict";
const options_1 = require("./options");
const requireDir = require("require-dir");
function initialize(owaBuildOptions) {
    options_1.setOptions(owaBuildOptions);
    requireDir('tasks');
}
exports.initialize = initialize;
var taskSequence_1 = require("./utils/taskSequence");
exports.setTaskSequence = taskSequence_1.setTaskSequence;
exports.getTaskSequence = taskSequence_1.getTaskSequence;
