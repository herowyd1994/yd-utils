export const resizeImage = ({ url, type = '*', size }) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?x-image-process=image/resize,m_lfit,${type !== '*' ? `${type}_${w}` : `w_${w},h_${h}`}`;
};
export const formatImage = (url, format = 'png') => `${url}?x-image-process=image/format,${format}`;
export const imageInfo = (url) => `${url}?x-image-process=image/info`;
