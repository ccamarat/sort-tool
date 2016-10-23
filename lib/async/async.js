/**
 * Allows NodeJS callback style functions to be called as if they were async. In other words, rather than calling
 * `someAsyncFunction(args, function (error, result) { // test error or do work and return result }`, you can call
 * `await asAsync(someAsyncFunction, args)` instead
 * @param delegate Node style function to call
 * @param args
 * @returns {Promise}
 */
export function asAsync(delegate, ...args) {
    return new Promise((resolve, reject) => {
        delegate(...args, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

/**
 * Returns an es7 async compatible version of the requested function
 * @param fn
 * @returns {function(this:null)}
 */
export function asyncify(fn) {
    return asAsync.bind(null, fn);
}
