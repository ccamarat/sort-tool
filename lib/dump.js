import Queue from './queue';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

export const dump = (stagingDir, sourceFiles, done) => {
    const queue = Queue.create(sourceFiles);
    const results = {
        errors: {},
        sortCount: sourceFiles && sourceFiles.length
    };

    if (!results.sortCount) {
        return done(null, results);
    }

    mkdirSync(stagingDir);

    const queueDelegate = (sourceFile, done) => {
        fs.stat(sourceFile, (err, stat) => {
            const targetDir = path.join(stagingDir, moment(stat.mtime).format('YYYY.MM.DD'));
            const targetFile = targetDir + sourceFile.substring(sourceFile.lastIndexOf('\\'));
            mkdirSync(targetDir);
            copyFile(sourceFile, targetFile, err => {
                if (err) {
                    results.errors[sourceFile] = err;
                    results.sortCount--;
                }
                done(err);
            });
        });
    };

    queue.process(queueDelegate, () => {
        done(null, results);
    });
};

function copyFile(source, target, done) {
    console.log(source, ' => ', target);
    var cbCalled = false;

    var rd = fs.createReadStream(source);
    rd.on('error', function (err) {
        callDone(err);
    });
    var wr = fs.createWriteStream(target);
    wr.on('error', function (err) {
        callDone(err);
    });
    wr.on('close', function (ex) {
        callDone();
    });
    rd.pipe(wr);

    function callDone(err) {
        if (!cbCalled) {
            done(err);
            cbCalled = true;
        }
    }
}

function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}
