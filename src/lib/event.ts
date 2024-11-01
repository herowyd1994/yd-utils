/** @format */

import { Handler } from '../types';

/**
 * 防抖
 * @param {Handler<V>} handler
 * @param {number} time
 * @returns {(...args: any[]) => Promise<V>}
 */
export const throttle = <V>(handler: Handler<V>, time: number = 1500) => {
    let pTime = 0;
    return (...args: any[]) =>
        new Promise<V>(resolve => {
            const cTime = Date.now();
            if (cTime - pTime < time) {
                return;
            }
            pTime = cTime;
            resolve(handler(...args));
        });
};
/**
 * 节流
 * @param {Handler<V>} handler
 * @param {number} delay
 * @returns {(...args: any[]) => Promise<V>}
 */
export const debounce = <V>(handler: Handler<V>, delay: number = 250) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) =>
        new Promise<V>(resolve => {
            timer && clearTimeout(timer);
            timer = setTimeout(() => resolve(handler(...args)), delay);
        });
};
