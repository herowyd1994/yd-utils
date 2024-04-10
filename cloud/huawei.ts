/** @format */

/**
 * https://support.huaweicloud.com/fg-obs/obs_01_0430.html
 * 图片缩略
 * @param {string} url
 * @param {number | [number, number]} size
 *
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
    return `${url}${type !== 'l' ? 'm_fill,' : ''}${type}_${size}`;
}
/**
 * 获取图片信息
 * @param {string} url
 * @returns {string}
 */
export const imageInfo = (url: string) => `${url}?x-image-process=image/info`;
/**
 * 格式转换
 * @param {string} url
 * @param {"jpg" | "png" | "webp" | "bmp"} format
 * @returns {string}
 */
export const formatImage = (url: string, format: 'jpg' | 'png' | 'webp' | 'bmp' = 'png') =>
    `${url}?x-image-process=image/format,${format}`;
/**
 * 质量变换
 * @param {string} url
 * @param {number} size
 * @param {number} quality
 * @returns {string}
 */
export const qualityImage = (
    url: string,
    size: number | [number, number],
    quality: number = 85
) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?x-image-process=image/resize,w_${w},h_${h}/quality,q_${quality}`;
};
