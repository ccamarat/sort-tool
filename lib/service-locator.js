const registry = {};

export const serviceLocator = {
    register(key, value) {
        registry[key] = value;
    },

    resolve(...deps) {
        const registryKeys = Object.keys(registry);

        const invalids = deps.filter(dep => registryKeys.indexOf(dep) === -1);
        if (invalids.length > 0) {
            throw new Error(`Could not find these guys: ${invalids.join(', ')}`);
        }

        const matches = registryKeys
            .filter(key => deps.includes(key))
            .map(key => registry[key]);

        return matches.length === 1 ? matches[0] : matches;
    },
};
