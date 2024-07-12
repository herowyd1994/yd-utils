/** @format */

import { ResizeImageOpts } from '../types';

/**
 * https://help.aliyun.com/zh/oss/user-guide/resize-images-4?spm=a2c4g.11186623.0.0.78da24e7ZFMgEr#b248f7f074dc1
 * 图片缩略
 * @param {string} url
 * @param {"w" | "h" | "*"} type
 * @param {number | [number, number]} size
 * @returns {string}
 */
export const resizeImage = ({ url, type = '*', size }: ResizeImageOpts) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?x-oss-process=image/resize,m_fill,${type !== '*' ? `${type}_${w}` : `w_${w},h_${h}`}`;
};
/**
 * 格式转换
 * @param {string} url
 * @param {"jpg" | "png" | "webp" | "bmp" | "gif" | "tiff"} format
 * @returns {string}
 */
export const formatImage = (url: string, format: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' = 'png') =>
    `${url}?x-oss-process=image/format,${format}`;
/**
 * 获取信息
 * @param {string} url
 * @returns {string}
 */
export const imageInfo = (url: string) => `${url}?x-oss-process=image/info`;
/**
 * https://help.aliyun.com/zh/oss/user-guide/video-transcoding?spm=a2c4g.11186623.0.0.49502611rraFfY
 * 视频转码
 * @param {string} url
 * @param {number} start
 * @param {number} time
 * @param {"mp4" | "mkv" | "mov" | "asf" | "avi" | "mxf" | "ts" | "flv"} format
 * @returns {string}
 */
export const convertVideo = (
    url: string,
    start: number = 0,
    time: number = 60,
    format: 'mp4' | 'mkv' | 'mov' | 'asf' | 'avi' | 'mxf' | 'ts' | 'flv' = 'mp4'
) => `${url}?x-oss-async-process=video/convert,ss_${start},t_${time * 1000},f_${format}`;
/**
 * 视频截帧
 * @param {string} url
 * @param {number | [number, number]} size
 * @param {number} start
 * @param {"jpg" | "png"} format
 * @returns {string}
 */
export const snapshotsVideo = (
    url: string,
    size: number | [number, number],
    start: number = 0,
    format: 'jpg' | 'png' = 'png'
) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?x-oss-async-process=video/snapshots,scaletype_fit,w_${w},h_${h},ss_${start},f_${format}`;
};
/**
 * 视频信息提取
 * @param {string} url
 * @returns {string}
 */
export const videoInfo = (url: string) => `${url}?x-oss-process=video/info`;
