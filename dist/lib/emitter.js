export const on = (key, handler) => {
    init(key, handler);
    return () => (store[key] = store[key].filter(fn => fn !== handler));
};
export const once = (key, handler) => {
    init(key, handler);
    handler.once = false;
};
export const off = (keys) => each(keys, key => delete store[key]);
export const emit = (keys, ...args) => each(keys, key => {
    if (!store[key]) {
        return;
    }
    store[key].forEach(fn => {
        fn(...args);
        fn.hasOwnProperty('once') && (fn.once = true);
    });
    store[key] = store[key].filter(fn => fn.once !== true);
});
export const count = (key) => (store[key] ? store[key].length : 0);
const store = {};
const init = (key, handler) => {
    !store[key] && (store[key] = []);
    store[key].push(handler);
};
const each = (keys, handler) => {
    keys =
        keys === '*' ? Object.keys(store)
            : typeof keys === 'string' ? [keys]
                : keys;
    keys.forEach(handler);
};
