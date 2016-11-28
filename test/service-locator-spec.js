import { describe } from 'ava-spec';
import { serviceLocator } from '../lib/service-locator';

describe('service-locator-spec', (it) => {
    it('should locate a requested service', (t) => {
        const dummyService = {};
        serviceLocator.register('dummy', dummyService);

        const ds = serviceLocator.resolve('dummy');

        t.is(dummyService, ds);
    });

    it('should return a list of requested services', (t) => {
        const dummyService1 = {};
        const dummyService2 = {};
        serviceLocator.register('dummy1', dummyService1);
        serviceLocator.register('dummy2', dummyService2);

        const [ds1, ds2] = serviceLocator.resolve('dummy1', 'dummy2');

        t.is(dummyService1, ds1);
        t.is(dummyService2, ds2);
    });

    it('should throw if the requested service is not found', (t) => {
        t.throws(() => {
            serviceLocator.resolve('not here');
        });
    });
});
