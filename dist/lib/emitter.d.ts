import { EmitterHandler } from '../types';
export declare const on: (key: string, handler: EmitterHandler) => () => EmitterHandler[];
export declare const once: (key: string, handler: EmitterHandler) => void;
export declare const off: (keys: string | string[] | "*") => void;
export declare const emit: (keys: string | string[] | "*", ...args: any[]) => void;
export declare const count: (key: string) => number;
