import { describe } from 'ava-spec';
import { wait } from '../lib/async/async';
import { createQueue } from '../lib/queue';

describe('queue-spec', (it) => {
    it('should create a queue processor', (t) => {
        const work = [1, 2, 3, 4, 5];
        const queue = createQueue(work);
        t.truthy(queue.process);
    });

    it('should support async delegation', async (t) => {
        const work = [1, 2, 3, 4, 5];
        const queue = createQueue(work);
        let result = 0;
        const asyncDelegate = async (num) => {
            await wait(5);
            result += num;
        };

        await queue.process(asyncDelegate);

        t.deepEqual(result, 15);
    });

    it('should support delegation', async (t) => {
        const work = [1, 2, 3, 4, 5];
        const queue = createQueue(work);
        let result = 0;
        const delegate = (num) => {
            result += num;
        };

        await queue.process(delegate);

        t.deepEqual(result, 15);
    });

    it('should indicate a problem if backlog is empty', async (t) => {
        const work = [];
        const queue = createQueue(work);
        t.throws(queue.process(() => {}));
    });
});
