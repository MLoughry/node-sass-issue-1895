"use strict";
const minimist = require("minimist");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = minimist(process.argv.slice(2), {
    alias: {
        k: "karma",
        nl: "nolint",
        s: "https",
        e: "entry",
        p: "production",
    }
});
