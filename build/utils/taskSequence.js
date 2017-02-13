"use strict";
const run = require("run-sequence");
const options_1 = require("../options");
let subtasks = {};
function setTaskSequence(task, sequence) {
    subtasks[task] = sequence;
}
exports.setTaskSequence = setTaskSequence;
function getTaskSequence(task) {
    return subtasks[task];
}
exports.getTaskSequence = getTaskSequence;
function runTaskSequence(task, callback) {
    const gulp = options_1.default.gulpInstance;
    if (!subtasks[task]) {
        throw new Error(`Error! ${task} does not have any registered task sequence`);
    }
    let tasks = subtasks[task];
    if (callback) {
        tasks = tasks.concat(callback);
    }
    run.use(gulp).apply(null, tasks);
}
exports.runTaskSequence = runTaskSequence;
