import libMocha from 'mocha';
import libChai from 'chai';
import libSinon from 'sinon';
import dirtyChai from 'dirty-chai';

libChai.use(dirtyChai);

export const describe = libMocha.describe;
export const it = libMocha.it;
export const expect = libChai.expect;
export const sinon = libSinon;
