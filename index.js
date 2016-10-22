#! /usr/bin/env node
var fs = require('fs');
const path = require('path');
const args = require('yargs')
    .default('p', '../')
    .default('o', 'sorted')
    .argv;
const walk = require('./lib/walk');
const dump = require('./lib/dump');

const searchPath = path.join(__dirname, args.p);
const outputPath = path.join(__dirname, args.p, args.o);

console.log(`Sorting ${searchPath} -> ${outputPath}`);

const pattern = /\.(jpg|png|gif|flv|mov|mpg|mp4)\b/i; // larger files
// const pattern = /\.(jpg|png|gif)\b/i; // smaller files

walk(searchPath, pattern, (error, results) => {
    if (error) {
        throw error;
    }

    dump(outputPath, results, (error, results) => {
        if (error) {
            console.log('error!');
            return;
        }
        console.log(`Success. Copied ${results.sortCount}`);
    });
});
