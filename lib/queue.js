const PROCESSING_QUEUE_SIZE = 3;

export const create = (backlog) => {
    const workLog = [];
    var processDelegate;
    var resolver;
    var rejector;

    const processWorkLog = () => {
        return new Promise((resolve, reject) => {
            resolver = resolve;
            rejector = reject;
            for (var i = 0; i < PROCESSING_QUEUE_SIZE; i++) {
                fillSlot(i);
            }
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

    const processSlot = (index) => {
        processDelegate(workLog[index], () => {
            delete workLog[index];
            fillSlot(index);
        });
    };

    const maybeFinish = () => {
        const itemsRemaining = Object.keys(workLog);
        if (!itemsRemaining.length) {
            resolver();
        }
    };

    return {
        process (delegate, done) {
            processDelegate = delegate;
            return processWorkLog().then(done);
        }
    };
};
