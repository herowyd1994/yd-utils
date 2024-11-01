export const downloadFile = async (url, fileName, { onError, ...config } = { onError: ({ message }) => alert(message) }) => {
    const href = URL.createObjectURL(await fetch(url, config).then(async (res) => {
        if (res.status >= 400) {
            onError(await res.json());
            return Promise.reject();
        }
        return res.blob();
    }));
    const a = document.createElement('a');
    a.href = href;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(href);
};
export const selectFile = (type = 'single', accept = '*') => new Promise(resolve => {
    const input = document.createElement('input');
    input.accept = accept;
    input.type = 'file';
    input.multiple = type === 'multiple';
    input.click();
    input.onchange = ({ target }) => resolve(target.files);
});
export const transformFileType = (blob, type) => new Promise(resolve => {
    const fr = new FileReader();
    switch (type) {
        case 'arrayBuffer':
            fr.readAsArrayBuffer(blob);
            break;
        case 'binary':
            fr.readAsBinaryString(blob);
            break;
        case 'base64':
            fr.readAsDataURL(blob);
            break;
    }
    fr.onload = () => resolve(fr.result);
});
export const urlToBase64 = async (url, { onError, ...config } = { onError: ({ message }) => alert(message) }) => transformFileType(await fetch(url, config).then(async (res) => {
    if (res.status >= 400) {
        onError(await res.json());
        return Promise.reject();
    }
    return res.blob();
}), 'base64');
export const base64ToFile = (base64, fileName) => {
    const arr = base64.split(',');
    const type = arr[0].match(/:(.*?);/)[1];
    const suffix = type.split('/')[1];
    const str = atob(arr[1]);
    let { length } = str;
    const u8arr = new Uint8Array(length);
    while (length--) {
        u8arr[length] = str.charCodeAt(length);
    }
    return new File([u8arr], `${fileName}.${suffix}`, { type });
};
