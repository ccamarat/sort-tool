import { describe, it, expect, sinon } from '../.test-env';
import * as async from '../../lib/async/async';

describe('async', () => {
    it('should define a couple functions', () => {
        expect(async.asyncify).to.be.ok();
        expect(async.asAsync).to.be.ok();
    });

    describe('asAsync', () => {
        it('should return "success" value async', async() => {
            function dummy(done) {
                setTimeout(() => {
                    done(null, 42);
                }, 50);
            }

            const result = await async.asAsync(dummy);

            expect(result).to.equal(42);
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

            expect(result).to.equal(42);
        });

        it('should pass through params to delegate', async() => {
            const blah = {
                dummy(a, b, c, done) {
                    setTimeout(() => {
                        done(null, 42);
                    }, 50);
                },
            };

            const spy = sinon.spy(blah, 'dummy');

            await async.asAsync(spy, 1, 2, 3);

            expect(spy.calledWith(1, 2, 3, sinon.match.func));
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

            expect(result).to.equal(42);
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
                result = await dummyAsync();
            } catch (e) {
                result = e;
            }

            expect(result).to.equal(42);
        });

        it('should pass through params to delegate', async() => {
            function dummy(a, b, c, done) {
                setTimeout(() => {
                    done(null, 42);
                }, 50);
            }
            const blah = {
                dummy: async.asyncify(dummy),
            };
            const spy = sinon.spy(blah, 'dummy');

            await async.asAsync(spy, 1, 2, 3);

            expect(spy.calledWith(1, 2, 3, sinon.match.func));
        });
    });
});
