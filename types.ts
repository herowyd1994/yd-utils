/** @format */

export type Handler<V = any> = (...args: any[]) => V;
export type EmitterHandler = Handler & Partial<{ once: boolean }>;
