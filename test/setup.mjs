"use strict";

import {resolve} from "node:path";
import fastGlob from 'fast-glob';
const {globSync} = fastGlob;

const pathFiles = resolve('src');
const buildFiles = resolve('build');

const esmfiles = globSync(pathFiles +"/**/*.spec.{js, mjs}");
if(esmfiles.length >= 1) {
    esmfiles.forEach(file => {
        import(file);
    });
}
import("./build/plain.mjs");