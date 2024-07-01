/** @format */

export type Handler<V = any> = (...args: any[]) => V;
export type EmitterHandler = Handler & Partial<{ once: boolean }>;
export interface ResizeImageOpts {
    url: string;
    type: 'w' | 'h' | '*';
    size: number | [number, number];
}
export interface ImageView2Opts extends ResizeImageOpts {
    format?: 'jpg' | 'gif' | 'png' | 'webp';
    interlace?: boolean;
}
export interface ImageMogr2Opts extends Omit<ImageView2Opts, 'format'> {
    format?: ImageView2Opts['format'] | 'bmp' | 'yjpeg';
}
export interface DownloadFileConfig extends RequestInit {
    onError: (error: any) => void;
}
