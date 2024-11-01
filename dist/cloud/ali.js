export const resizeImage = ({ url, type = '*', size }) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?x-oss-process=image/resize,m_fill,${type !== '*' ? `${type}_${w}` : `w_${w},h_${h}`}`;
};
export const formatImage = (url, format = 'png') => `${url}?x-oss-process=image/format,${format}`;
export const imageInfo = (url) => `${url}?x-oss-process=image/info`;
export const convertVideo = (url, start = 0, time = 60, format = 'mp4') => `${url}?x-oss-async-process=video/convert,ss_${start},t_${time * 1000},f_${format}`;
export const snapshotsVideo = (url, size, start = 0, format = 'png') => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?x-oss-async-process=video/snapshots,scaletype_fit,w_${w},h_${h},ss_${start},f_${format}`;
};
export const videoInfo = (url) => `${url}?x-oss-process=video/info`;
