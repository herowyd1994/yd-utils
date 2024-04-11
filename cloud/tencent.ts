/** @format */

import { ImageMogr2Opts } from '../types';

/**
 * https://developer.qiniu.com/dora/1279/basic-processing-images-imageview2
 * 图片缩略 + 渐进显示 + 格式转换
 * @param {string} url
 * @param {"w" | "h" | "*"} type
 * @param {number | [number, number]} size
 * @param {"jpg" | "gif" | "png" | "webp" | "bmp" | "yjpeg"} format
 * @param {boolean} interlace
 * @returns {string}
 */
export const imageMogr2 = ({ url, type = '*', size, format, interlace = true }: ImageMogr2Opts) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?imageMogr2/thumbnail/${
        type === 'w' ? `${w}x`
        : type === 'h' ? `x${w}`
        : `${w}x${h}`
    }${!format ? '' : `/format/${format}`}/interlace/${Number(interlace)}`;
};
/**
 * 获取图片基本信息
 * @param {string} url
 * @returns {string}
 */
export const imageInfo = (url: string) => `${url}?imageInfo`;
