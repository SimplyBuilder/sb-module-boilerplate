'use strict';

import {build} from 'unbuild';
import {copyFile} from 'node:fs';

const libName = 'sb-boilerplate';

const umdGenerate = {
    entries: [{
        builder: 'rollup',
        input: `build/plain/${libName}.cjs`,
        name: libName
    }],
    outDir: 'lib',
    clean: true,
    declaration: false,
    failOnWarn: false,
    rollup: {
        emitCJS: true,
        output: {
            dir: 'lib',
            strict: true,
            generatedCode: {
                arrowFunctions: true,
                constBindings: true,
                objectShorthand: true,
                symbols: true,
            },
            extend: true,
            interop: 'auto',
            validate: true,
            exports: 'auto',
            minifyInternalExports: true,
            name: 'SimplyBuilder',
            format: 'umd',
            entryFileNames: `${libName}.min.umd.js`,
            compact: true,
        },
        esbuild: {
            minify: true,
            keepNames: true
        }
    },
    hooks: {
        'build:done': () => {
            copyFile(`lib/${libName}.min.umd.js`, `lib/${libName}.min.umd.cjs`, (r) => r);
            copyFile(`lib/${libName}.min.umd.js`, `lib/${libName}.min.umd.mjs`, (r) => r);
            copyFile(`build/min/${libName}.cjs`, `lib/${libName}.min.common.cjs`, (r) => r);
            copyFile(`build/min/${libName}.mjs`, `lib/${libName}.min.esm.mjs`, (r) => r);
            copyFile('types.d.ts', 'lib/types.d.ts', (r) => r);
        }
    }
}
const plainMinify = {
    entries: [{
        builder: 'rollup',
        input: `build/plain/${libName}.cjs`,
        name: libName
    }],
    outDir: 'build/min',
    clean: true,
    declaration: false,
    failOnWarn: false,
    rollup: {
        emitCJS: true,
        output: {
            dir: 'build/min',
            name: libName,
        },
        esbuild: {
            minify: true,
            keepNames: true
        }
    },
    hooks: {
        'build:done': ctx => {
            console.log(`build/min/${libName}.min.cjs done`);
        }
    }
};
const plainGenerate = {
    entries: [{
        builder: 'rollup',
        input: 'src/main.cjs',
        name: libName
    }],
    outDir: 'build/plain',
    clean: true,
    declaration: false,
    failOnWarn: false,
    rollup: {
        inlineDependencies: true,
        emitCJS: true,
        output: {
            dir: 'build/plain',
            strict: true,
            generatedCode: {
                arrowFunctions: true,
                constBindings: true,
                objectShorthand: true,
                symbols: true,
            },
            interop: 'auto',
            validate: true,
            noConflict: true,
            exports: 'named',
            minifyInternalExports: true,
            name: libName,
            format: 'cjs',
            entryFileNames: `${libName}.[format]`,
            compact: true,
        }
    },
    hooks: {
        'build:done': ctx => {
            console.log(`build/plain/${libName}.cjs done`);
        }
    }
};

const umdGenerateAndLib = () => {
    build('.', false, umdGenerate).then();
}
const minFilesGenerate = () => {
    build('.', false, plainMinify).then(umdGenerateAndLib);
}
const plainCommonGenerate = () => {
    build('.', false, plainGenerate).then(minFilesGenerate);
}

plainCommonGenerate();