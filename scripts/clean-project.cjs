"use strict";
const {resolve} = require("node:path");

const rootPath = resolve(__dirname, "..");
const tmps = [
    `${rootPath}/build`,
    `${rootPath}/lib`
];
require('./removeItem.cjs')({rootPath, tmps});
