export const imageView2 = ({ url, type = '*', size, format = 'png', interlace = true }) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?imageView2/${type !== '*' ? `2/${type}/${w}` : `1/w/${w}/h/${h}`}/format/${format}/interlace/${Number(interlace)}`;
};
export const imageInfo = (url) => `${url}?imageInfo`;
export const avthumb = (url, format = 'mp4', start = 0, time = 60) => `${url}?avthumb/${format}/ss/${start}/t/${time}`;
export const vframe = (url, size, offset = 0, format = 'png') => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?vframe/${format}/offset/${offset}/w/${w}/h/${h}`;
};
export const avinfo = (url) => `${url}?avinfo`;
