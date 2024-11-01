export const imageMogr2 = ({ url, type = '*', size, format = 'png', interlace = true }) => {
    const [w, h] = Array.isArray(size) ? size : [size, size];
    return `${url}?imageMogr2/thumbnail/${type === 'w' ? `${w}x`
        : type === 'h' ? `x${w}`
            : `${w}x${h}`}/format/${format}/interlace/${Number(interlace)}`;
};
export const imageInfo = (url) => `${url}?imageInfo`;
