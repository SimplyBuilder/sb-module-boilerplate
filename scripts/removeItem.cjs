"use strict";

const fs = require("node:fs");
const fastGlob = require('fast-glob');
const {globSync} = fastGlob;
const removeItem = (item) => {
    try {
        fs.rm(item, { recursive: true, force: true }, err => {
            if (err) throw err;
            console.log(`${item} is deleted!`);
        });
    } catch (err) {
        console.error(err);
    }
}

exports = module.exports = (data) => {
    const {rootPath, tmps} = data;
    if(rootPath) {
        const packfiles = globSync(`${rootPath}/*.tgz`);

        if (packfiles.length >= 1) {
            packfiles.forEach(item => {
                removeItem(item);
            });
        }
    }
    if(tmps) {
        tmps.forEach(item => {
            removeItem(item);
        });
    }
};