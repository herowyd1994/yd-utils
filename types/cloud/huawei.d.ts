import { ResizeImageOpts } from '../types';
export declare const resizeImage: ({ url, type, size }: ResizeImageOpts) => string;
export declare const formatImage: (url: string, format?: "jpg" | "png" | "webp" | "bmp") => string;
export declare const imageInfo: (url: string) => string;
