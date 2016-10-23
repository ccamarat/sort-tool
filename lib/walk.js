import fs from 'fs';
import path from 'path';

export const walk = (dir, pattern, done) => {
    let results = [];

    fs.readdir(dir, (err, list) => {
        if (err) {
            return done(err);
        }

        let pending = list.length;
        if (!pending) {
            return done(null, results);
        }

        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, pattern, (err, res) => {
                        results = results.concat(res);
                        if (!--pending) {
                            done(null, results);
                        }
                    });
                } else {
                    if (file.match(pattern)) {
                        results.push(file);
                    }

                    if (!--pending) {
                        done(null, results);
                    }
                }
            });
        });
    });
};
