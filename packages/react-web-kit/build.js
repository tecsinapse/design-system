#!/usr/bin/env node

const esbuild = require('esbuild');

let jsFiles = [];

var glob = require("glob");

jsFiles = glob.sync("./src/**/*.js");

console.log(jsFiles);

require('esbuild').build({
    entryPoints: jsFiles,
    bundle: false,
    outdir: 'esbuild/src',
  }).catch(() => process.exit(1));