/** @format */

/**
 * https://developer.qiniu.com/dora/1279/basic-processing-images-imageview2
 * 图片缩略 + 渐进显示 + 格式转换
 * @param {string} url
 * @param {number | [number, number]} size
 * @param {'jpg' | 'gif' | 'png' | 'webp'} format
 * @returns {string}
 *
 * @param {string} url
 * @param {"w" | "h" } type
 * @param {number} size
 * @param {'jpg' | 'gif' | 'png' | 'webp'} format
 * @returns {string}
 */
export function imageView2(
    url: string,
    size: number | [number, number],
    format?: 'jpg' | 'gif' | 'png' | 'webp'
): string;
export function imageView2(
    url: string,
    type: 'w' | 'h',
    size: number,
    format?: 'jpg' | 'gif' | 'png' | 'webp'
): string;
export function imageView2(url: any, type: any, size?: any, format?: any): string {
    url = `${url}?imageView2/`;
    if (typeof type !== 'string') {
        const [w, h] = Array.isArray(size) ? size : [size, size];
        url = `${url}1/w/${w}/h/${h}`;
    } else {
        url = `${url}2/${type}/${size}`;
    }
    return `${url}/interlace/1${format ? `/format/${format}` : ''}`;
}
/**
 * 图片基本信息
 * @param {string} url
 * @returns {string}
 */
export const imageInfo = (url: string) => `${url}?imageInfo`;
/**
 * https://developer.qiniu.com/dora/1313/video-frame-thumbnails-vframe
 * 普通音视频转码
 * @param {string} url
 * @param {"mp4" | "mkv" | "mov" | "asf" | "avi" | "mxf" | "ts" | "flv"} format
 * @param {number} start
 * @param {number} time
 * @returns {string}
 */
export const avthumb = (
    url: string,
    format: 'mp4' | 'mkv' | 'mov' | 'asf' | 'avi' | 'mxf' | 'ts' | 'flv' = 'mp4',
    start: number = 0,
    time: number = 60
) => `${url}?avthumb/${format}/ss/${start}/t/${time}`;
/**
 * 视频单帧缩略图
 * @param {string} url
 * @param {number | [number, number]} size
 * @param {number} offset
 * @param {"jpg" | "png"} format
 * @returns {string}
 */
export const vframe = (
    url: string,
    size: number | [number, number],
    offset: number = 0,
    format: 'jpg' | 'png' = 'png'
) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?vframe/${format}/offset/${offset}/w/${w}/h/${h}`;
};
/**
 * 视频信息提取
 * @param {string} url
 * @returns {string}
 */
export const avinfo = (url: string) => `${url}?avinfo`;
