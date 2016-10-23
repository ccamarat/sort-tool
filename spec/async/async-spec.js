import * as async from '../../lib/async/async';
import install from 'jasmine-es6/overrides/async';
install();

describe('async', () => {
    it('should define a couple functions', () => {
        expect(async.asyncify).toBeDefined();
        expect(async.asAsync).toBeDefined();
    });

    describe('asAsync', () => {
        it('should return "success" value async', async() => {
            function dummy(done) {
                setTimeout(() => {
                    done(null, 42);
                }, 50);
            }

            const result = await async.asAsync(dummy);

            expect(result).toBe(42);
        });

        it('should throw "failure" value async', async() => {
            function dummy(done) {
                setTimeout(() => {
                    done(42);
                }, 50);
            }

            let result;

            try {
                await async.asAsync(dummy);
            } catch (e) {
                result = e;
            }

            expect(result).toBe(42);
        });

        it('should pass through params to delegate', async() => {
            const blah = {
                dummy(a, b, c, done) {
                    setTimeout(() => {
                        done(null, 42);
                    }, 50);
                }
            };

            const spy = spyOn(blah, 'dummy').and.callThrough();

            await async.asAsync(spy, 1, 2, 3);

            expect(spy).toHaveBeenCalledWith(1, 2, 3, jasmine.any(Function));
        });
    });

    describe('asyncify', () => {
        it('should return "success" value async', async() => {
            function dummy(done) {
                setTimeout(() => {
                    done(null, 42);
                }, 50);
            }

            const dummyAsync = async.asyncify(dummy);

            const result = await dummyAsync();

            expect(result).toBe(42);
        });

        it('should throw "failure" value async', async() => {
            function dummy(done) {
                setTimeout(() => {
                    done(42);
                }, 50);
            }

            let result;
            const dummyAsync = async.asyncify(dummy);
            try {
                await dummyAsync();
            } catch (e) {
                result = e;
            }

            expect(result).toBe(42);
        });

        it('should pass through params to delegate', async() => {
            function dummy(a, b, c, done) {
                setTimeout(() => {
                    done(null, 42);
                }, 50);
            }
            const blah = {
                dummy: async.asyncify(dummy)
            };
            const spy = spyOn(blah, 'dummy').and.callThrough();

            await async.asAsync(spy, 1, 2, 3);

            expect(spy).toHaveBeenCalledWith(1, 2, 3, jasmine.any(Function));
        });
    });
});
