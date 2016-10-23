const PROCESSING_QUEUE_SIZE = 3;

export const create = (backlog = []) => {
    const workLog = [];
    let processDelegate;
    let resolver;

    const maybeFinish = () => {
        const itemsRemaining = Object.keys(workLog);
        if (!itemsRemaining.length) {
            resolver();
        }
    };

    const processSlot = (index) => {
        processDelegate(workLog[index], () => {
            delete workLog[index];
            fillSlot(index);
        });
    };

    const fillSlot = (index) => {
        if (backlog.length) {
            workLog[index] = backlog.shift();
            processSlot(index);
        } else {
            maybeFinish();
        }
    };

    const processWorkLog = () => new Promise((resolve, reject) => {
        resolver = resolve;

        if (!backlog.length) {
            reject('No backlog!');
            return;
        }

        for (let i = 0; i < PROCESSING_QUEUE_SIZE; i++) {
            fillSlot(i);
        }
    });

    // to: object freeze
    return {
        process(delegate, done) {
            processDelegate = delegate;
            return processWorkLog().then(done);
        },
    };
};
