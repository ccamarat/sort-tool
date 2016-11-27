import fs from 'fs';
import { asyncify } from './async';

export const fsAsync = asyncify(fs.stat);
export const mkDirAsync = asyncify(fs.mkdir);
export const readDirAsync = asyncify(fs.readdir);
export const statAsync = asyncify(fs.stat);
