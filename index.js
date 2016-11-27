/* eslint no-console: 0 */

import path from 'path';
import yargs from 'yargs';
import { walk } from './lib/walk';
import { dump } from './lib/dump';

const args = yargs
    .default('p', './test-cases/input/')
    .default('o', './test-cases/output/')
    .argv;

const searchPath = path.join(__dirname, args.p);
const outputPath = path.join(__dirname, args.o);

console.log(`Sorting ${searchPath} -> ${outputPath}`);

// const pattern = /\.(jpg|png|gif|flv|mov|mpg|mp4)\b/i; // larger files
const pattern = /\.(jpg|png|gif)\b/i; // smaller files

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
