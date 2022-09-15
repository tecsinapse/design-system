#!/usr/bin/env node

const esbuild = require('esbuild');
const glob = require("glob");

let tsFiles = glob.sync("./src/**/*.ts");
let tsxFiles = glob.sync("./src/**/*.tsx");

tsxFiles.forEach(file => {
  if(file.search('.stories.') == -1) {
    tsFiles.push(file);
  }
});

console.log(tsFiles);

require('esbuild').build({
    entryPoints: tsFiles,
    bundle: false,
    outdir: 'esbuild/src',
  }).catch(() => process.exit(1));