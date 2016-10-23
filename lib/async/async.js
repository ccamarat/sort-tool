/**
 * Allows NodeJS callback style functions to be called as if they were async. In other words, rather than calling
 * `someAsyncFunction(args, function (error, result) { // test error or do work and return result }`, you can call
 * `await asAsync(someAsyncFunction, args)` instead
 * @param fn Node style function to call
 * @param args
 * @returns {Promise}
 */
export function asAsync (fn, ...args) {
    return new Promise((res, rej) => {
        fn(...args, (e, r) => e ? rej(e) : res(r));
    });
}

/**
 * Returns an es7 async compatible version of the requested function
 * @param fn
 * @returns {function(this:null)}
 */
export function asyncify (fn) {
    return asAsync.bind(null, fn);
}
