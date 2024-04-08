/** @format */

/**
 * https://help.aliyun.com/zh/oss/user-guide/resize-images-4?spm=a2c4g.11186623.0.0.78da24e7ZFMgEr#b248f7f074dc1
 * 图片缩略
 * @param {string} url
 * @param {number | [number, number]} size
 *
 * @param {"w" | "h" | "l"} type
 * @param {number} size
 * @returns {string}
 */
function resizeImage(url: string, size: number | [number, number]): string;
function resizeImage(url: string, type: 'w' | 'h' | 'l', size: number): string;
function resizeImage(url: any, type: any, size?: any): string {
    url = `${url}?x-oss-process=image/resize,`;
    if (typeof type !== 'string') {
        const [w, h] = Array.isArray(size) ? size : [size, size];
        return `${url}m_fill,w_${w},h_${h}`;
    }
    return `${url}${type !== 'l' ? 'm_fill,' : ''}${type}_${size}`;
}
/**
 * 质量变换
 * @param {string} url
 * @param {"w" | "h"} type
 * @param {number} size
 * @param {number} quality
 * @returns {string}
 */
const qualityImage = (url: string, type: 'w' | 'h', size: number, quality: number = 85) =>
    `${url}?x-oss-process=image/resize,${type}_${size}/quality,q_${quality}`;
/**
 * 格式转换
 * @param {string} url
 * @param {"jpg" | "png" | "webp" | "bmp" | "gif" | "tiff"} format
 * @returns {string}
 */
const formatImage = (
    url: string,
    format: 'jpg' | 'png' | 'webp' | 'bmp' | 'gif' | 'tiff' = 'png'
) => `${url}?x-oss-process=image/format,${format}`;
/**
 * 获取信息
 * @param {string} url
 * @returns {string}
 */
const imageInfo = (url: string) => `${url}?x-oss-process=image/info`;
/**
 * https://help.aliyun.com/zh/oss/user-guide/video-transcoding?spm=a2c4g.11186623.0.0.49502611rraFfY
 * 视频转码
 * @param {string} url
 * @param {number} start
 * @param {number} time
 * @param {"mp4" | "mkv" | "mov" | "asf" | "avi" | "mxf" | "ts" | "flv"} format
 * @returns {string}
 */
const convertVideo = (
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
const snapshotsVideo = (
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
const videoInfo = (url: string) => `${url}?x-oss-process=video/info`;

export default {
    resizeImage,
    imageInfo,
    qualityImage,
    formatImage,
    convertVideo,
    snapshotsVideo,
    videoInfo
};
