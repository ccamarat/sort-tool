import path from 'path';
import yargs from 'yargs';
import walk from './lib/walk';
import dump from './lib/dump';

const args = yargs
    .default('p', '../')
    .default('o', 'sorted')
    .argv;

const searchPath = path.join(__dirname, args.p);
const outputPath = path.join(__dirname, args.p, args.o);

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
