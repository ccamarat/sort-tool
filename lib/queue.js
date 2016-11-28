const PROCESSING_QUEUE_SIZE = 3;

export const createQueue = (backlog = [], queueSize = PROCESSING_QUEUE_SIZE) => {
    const workLog = [];
    let processDelegate;
    let resolver;

    const maybeFinish = () => {
        const itemsRemaining = Object.keys(workLog);
        if (!itemsRemaining.length) {
            resolver();
        }
    };

    const processSlot = async (index) => {
        await processDelegate(workLog[index]);

        delete workLog[index];
        fillSlot(index);
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

        for (let i = 0; i < Math.min(queueSize, backlog.length); i++) {
            fillSlot(i);
        }
    });

    // to: object freeze
    return {
        process(delegate) {
            processDelegate = delegate;
            return processWorkLog();
        },
    };
};
