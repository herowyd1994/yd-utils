export * from './lib';
export * from './cloud';
export declare const sleep: (delay?: number) => Promise<unknown>;
export declare const getType: (target: any) => any;
export declare const deepClone: (target: any, deps?: WeakMap<Record<string, any>, Record<string, any>>) => any;
export declare const transformUrlParams: (params: Record<string, any>, symbol?: string) => string;
export declare const serializeUrlParams: (url: string, symbol?: string) => Record<string, any>;
export declare const filterNone: (target: any, filter?: any[]) => any;
export declare const isNone: (target: any) => boolean;
export declare const getBJTime: () => Date;
export declare const transformCountDown: (time: number, symbol?: string) => string;
export declare const preFix: (target: number | string, fix?: number) => string;
export declare const colorToRGBA: (color: string, opacity?: number) => string;
export declare const copyText: (text: string) => Promise<void>;
export declare const getDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
export declare const toFixed: (target: string | number, digits?: number, unit?: string) => string;
export declare const toBoundary: (target: string | number, digits?: number) => string;
export declare const toDiscount: (t1: number, t2: number, unit?: string) => string;
export declare const toMillennials: (target: string | number, symbol?: string) => string;
export declare const stripHtml: (html: string) => string;
export declare const strParse: (target: string) => any;
export declare const getCookie: () => {};
