import { ImageView2Opts } from '../types';
export declare const imageView2: ({ url, type, size, format, interlace }: ImageView2Opts) => string;
export declare const imageInfo: (url: string) => string;
export declare const avthumb: (url: string, format?: "mp4" | "mkv" | "mov" | "asf" | "avi" | "mxf" | "ts" | "flv", start?: number, time?: number) => string;
export declare const vframe: (url: string, size: number | [number, number], offset?: number, format?: "jpg" | "png") => string;
export declare const avinfo: (url: string) => string;
