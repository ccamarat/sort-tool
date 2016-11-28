import sinon from 'sinon';
import { describe } from 'ava-spec';
import * as async from '../../lib/async/async';

describe('async', (it) => {
    it('should define a couple functions', (t) => {
        t.truthy(async.asyncify);
        t.truthy(async.asAsync);
    });

    describe('asAsync', (it) => {
        it('should return "success" value async', async (t) => {
            function dummy(done) {
                setTimeout(() => {
                    done(null, 42);
                }, 50);
            }

            const result = await async.asAsync(dummy);

            t.deepEqual(result, 42);
        });

        it('should throw "failure" value async', async (t) => {
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

            t.deepEqual(result, 42);
        });

        it('should pass through params to delegate', async (t) => {
            const blah = {
                dummy(a, b, c, done) {
                    setTimeout(() => {
                        done(null, 42);
                    }, 50);
                },
            };

            const spy = sinon.spy(blah, 'dummy');

            await async.asAsync(spy, 1, 2, 3);

            t.true(spy.calledWith(1, 2, 3, sinon.match.func));
        });
    });

    describe('asyncify', (it) => {
        it('should not call delegate when created', (t) => {
            const spy = sinon.spy();

            async.asyncify(spy);

            t.false(spy.called);
        });

        it('should return "success" value async', async (t) => {
            function dummy(done) {
                setTimeout(() => {
                    done(null, 42);
                }, 50);
            }

            const dummyAsync = async.asyncify(dummy);

            const result = await dummyAsync();

            t.deepEqual(result, 42);
        });

        it('should throw "failure" value async', async (t) => {
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

            t.deepEqual(result, 42);
        });

        it('should pass through params to delegate', async (t) => {
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

            t.true(spy.calledWith(1, 2, 3, sinon.match.func));
        });
    });

    describe('wait',  it => {
        it('should wait the specified time before proceeding', async t => {
            const startTime = Date.now();
            await async.wait(50);
            const duration = Date.now() - startTime;
            t.true(duration >= 50);
        });
    });
});
