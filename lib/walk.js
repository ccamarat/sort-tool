export fs from 'fs';
export path from 'path';

export const walk = (dir, pattern, done) => {
    var results = [];

    fs.readdir(dir, function (err, list) {
        if (err) {
            return done(err);
        }

        var pending = list.length;
        if (!pending) {
            return done(null, results);
        }

        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, pattern, function (err, res) {
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
