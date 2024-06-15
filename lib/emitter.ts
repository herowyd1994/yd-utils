/** @format */

import { EmitterHandler } from '../types';

/**
 * 绑定事件
 * @param {string} key
 * @param {EmitterHandler} handler
 * @returns {() => EmitterHandler[]}
 */
export const on = (key: string, handler: EmitterHandler) => {
    init(key, handler);
    return () => (store[key] = store[key].filter(fn => fn !== handler));
};
/**
 * 绑定一次性事件
 * @param {string} key
 * @param {EmitterHandler} handler
 */
export const once = (key: string, handler: EmitterHandler) => {
    init(key, handler);
    handler.once = false;
};
/**
 * 解绑事件
 * @param {string | string[] | "*"} keys
 */
export const off = (keys: string | string[] | '*') => each(keys, key => delete store[key]);
/**
 * 触发事件
 * @param {string | string[] | "*"} keys
 */
export const emit = (keys: string | string[] | '*') =>
    each(keys, key => {
        if (!store[key]) {
            return;
        }
        store[key].forEach(fn => {
            fn();
            fn.hasOwnProperty('once') && (fn.once = true);
        });
        store[key] = store[key].filter(fn => fn.once !== true);
    });
/**
 * 获取当前key绑定事件的数量
 * @param {string} key
 * @returns {number}
 */
export const count = (key: string) => (store[key] ? store[key].length : 0);

const store: Record<string, EmitterHandler[]> = {};
const init = (key: string, handler: EmitterHandler) => {
    !store[key] && (store[key] = []);
    store[key].push(handler);
};
const each = (keys: string | string[] | '*', handler: (key: string) => void) => {
    keys =
        keys === '*' ? Object.keys(store)
        : typeof keys === 'string' ? [keys]
        : keys;
    keys.forEach(handler);
};
