/** @format */

export type Handler<V = any> = (...args: any[]) => V;
export type Event = Handler & { once?: boolean };
