/** @format */

import { ResizeImageOpts } from '../types';

/**
 * https://support.huaweicloud.com/fg-obs/obs_01_0430.html
 * 图片缩略
 * @param {string} url
 * @param {"w" | "h" | "*"} type
 * @param {number | [number, number]} size
 * @returns {string}
 */
export const resizeImage = ({ url, type = '*', size }: ResizeImageOpts) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?x-image-process=image/resize,m_lfit,${type !== '*' ? `${type}_${w}` : `w_${w},h_${h}`}`;
};
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
