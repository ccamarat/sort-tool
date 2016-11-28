import { describe } from 'ava-spec';
import * as fs from '../../lib/async/fs';

describe('async', (it) => {
    it('should define a couple functions', (t) => {
        t.truthy(fs.fsAsync);
        t.truthy(fs.mkDirAsync);
        t.truthy(fs.readDirAsync);
        t.truthy(fs.statAsync);
    });
});
