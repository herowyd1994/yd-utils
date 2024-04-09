/** @format */

import { Event } from '../types';

const store: Record<string, Event[]> = {};

const on = (key: string, handler: Event) => {
    onInit(key, handler);
    return () => (store[key] = store[key].filter((fn) => fn !== handler));
};
const once = (key: string, handler: Event) => {
    onInit(key, handler);
    handler.once = false;
};
const off = (keys: string | string[] | '*') => onEach(keys, (key) => delete store[key]);
const emit = (keys: string | string[] | '*') =>
    onEach(keys, (key) => {
        if (!store[key]) {
            return;
        }
        store[key].forEach((fn) => {
            fn.hasOwnProperty('once') && (fn.once = true);
            fn();
        });
        store[key] = store[key].filter((fn) => fn.once !== true);
    });
const count = (key: string) => (store[key] ? store[key].length : 0);

export default {
    on,
    once,
    off,
    emit,
    count
};

const onInit = (key: string, handler: Event) => {
    !store[key] && (store[key] = []);
    store[key].push(handler);
};
const onEach = (keys: string | string[] | '*', handler: (key: string) => void) => {
    keys =
        keys === '*' ? Object.keys(store)
        : typeof keys === 'string' ? [keys]
        : keys;
    keys.forEach(handler);
};
