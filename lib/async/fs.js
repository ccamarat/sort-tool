import fs from 'fs';
import {asyncify} from './async';

export const fsAsync = asyncify(fs.stat);
export const mkDirAsync = asyncify(fs.mkdir);
export const readdirAsync = asyncify(fs.readdir);
