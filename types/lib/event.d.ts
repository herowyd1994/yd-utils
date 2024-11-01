import { Handler } from '../types';
export declare const throttle: <V>(handler: Handler<V>, time?: number) => (...args: any[]) => Promise<V>;
export declare const debounce: <V>(handler: Handler<V>, delay?: number) => (...args: any[]) => Promise<V>;
