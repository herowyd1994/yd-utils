/** @format */

/**
 * https://support.huaweicloud.com/fg-obs/obs_01_0430.html
 * 图片缩略
 * @param {string} url
 * @param {number | [number, number]} size
 * @returns {string}
 *
 * @param {string} url
 * @param {"w" | "h" | "l"} type
 * @param {number} size
 * @returns {string}
 */
export function resizeImage(url: string, size: number | [number, number]): string;
export function resizeImage(url: string, type: 'w' | 'h' | 'l', size: number): string;
export function resizeImage(url: any, type: any, size?: any): string {
    url = `${url}?x-image-process=image/resize,`;
    if (typeof type !== 'string') {
        const [w, h] = Array.isArray(size) ? size : [size, size];
        return `${url}m_lfit,w_${w},h_${h}`;
    }
    return `${url}${type !== 'l' ? 'm_lfit,' : ''}${type}_${size}`;
}
/**
 * 格式转换
 * @param {string} url
 * @param {"jpg" | "png" | "webp" | "bmp"} format
 * @returns {string}
 */
export const formatImage = (url: string, format: 'jpg' | 'png' | 'webp' | 'bmp' = 'png') =>
    `${url}?x-image-process=image/format,${format}`;
/**
 * 获取图片信息
 * @param {string} url
 * @returns {string}
 */
export const imageInfo = (url: string) => `${url}?x-image-process=image/info`;
