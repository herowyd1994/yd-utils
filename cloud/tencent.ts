/** @format */

/**
 * https://cloud.tencent.com/document/api/1246/45375
 * 图片缩略 + 渐进显示 + 格式转换
 * @param {string} url
 * @param {number | [number, number]} size
 * @param {'jpg' | 'bmp' | 'gif' | 'png' | 'webp' | 'yjpeg'} format
 * @returns {string}
 *
 * @param {string} url
 * @param {"w" | "h" } type
 * @param {number} size
 * @param {'jpg' | 'bmp' | 'gif' | 'png' | 'webp' | 'yjpeg'} format
 * @returns {string}
 */
export function imageMogr2(
    url: string,
    size: number | [number, number],
    format?: 'jpg' | 'bmp' | 'gif' | 'png' | 'webp' | 'yjpeg'
): string;
export function imageMogr2(
    url: string,
    type: 'w' | 'h',
    size: number,
    format?: 'jpg' | 'bmp' | 'gif' | 'png' | 'webp' | 'yjpeg'
): string;
export function imageMogr2(url: any, type: any, size?: any, format?: any): string {
    url = `${url}?imageMogr2/thumbnail/`;
    if (type === 'w') {
        url = `${url}${size}x`;
    } else if (type === 'h') {
        url = `${url}x${size}`;
    } else {
        const [w, h] = Array.isArray(size) ? size : [size, size];
        url = `${url}${w}x${h}`;
    }
    return `${url}/interlace/1${format ? `/format/${format}` : ''}`;
}
/**
 * 获取图片基本信息
 * @param {string} url
 * @returns {string}
 */
export const imageInfo = (url: string) => `${url}?imageInfo`;
