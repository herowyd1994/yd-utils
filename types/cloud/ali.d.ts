import { ResizeImageOpts } from '../types';
export declare const resizeImage: ({ url, type, size }: ResizeImageOpts) => string;
export declare const formatImage: (url: string, format?: "jpg" | "png" | "webp" | "bmp" | "gif" | "tiff") => string;
export declare const imageInfo: (url: string) => string;
export declare const convertVideo: (url: string, start?: number, time?: number, format?: "mp4" | "mkv" | "mov" | "asf" | "avi" | "mxf" | "ts" | "flv") => string;
export declare const snapshotsVideo: (url: string, size: number | [number, number], start?: number, format?: "jpg" | "png") => string;
export declare const videoInfo: (url: string) => string;
