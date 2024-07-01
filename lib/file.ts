/** @format */

import { DownloadFileConfig } from '../types';

/**
 * 下载文件
 * @param {string} url
 * @param {string} fileName
 * @param {(error: any) => void} onError
 * @param {Omit<DownloadFileConfig, "onError">} config
 * @returns {Promise<void>}
 */
export const downloadFile = async (
    url: string,
    fileName: string,
    { onError, ...config }: DownloadFileConfig = { onError: ({ message }) => alert(message) }
) => {
    const blob = await fetch(url, config).then(async res => {
        if (res.status >= 400) {
            onError(await res.json());
            return Promise.reject();
        }
        return res.blob();
    });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(href);
};
/**
 * 选择文件
 * @param {"single" | "multiple"} type
 * @param {string} accept
 * @returns {Promise<FileList>}
 */
export const selectFile = (type: 'single' | 'multiple' = 'single', accept: string = '*') =>
    new Promise<FileList>(resolve => {
        const input = document.createElement('input');
        input.accept = accept;
        input.type = 'file';
        input.multiple = type === 'multiple';
        input.click();
        input.onchange = ({ target }: any) => resolve(target.files);
    });
/**
 * 转换文件类型
 * @param {Blob} blob
 * @param {"arrayBuffer" | "binary" | "base64"} type
 * @returns {Promise<string | ArrayBuffer | null>}
 */
export const transformFileType = (blob: Blob, type: 'arrayBuffer' | 'binary' | 'base64') =>
    new Promise<string | ArrayBuffer | null>(resolve => {
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
/**
 * 网络图片转base64
 * @param {string} url
 * @param {RequestInit} config
 * @returns {Promise<string | ArrayBuffer | null>}
 */
export const urlToBase64 = async (url: string, config?: RequestInit) => {
    const blob = await fetch(url, config).then(res => res.blob());
    return transformFileType(blob, 'base64');
};
/**
 * base64转文件
 * @param {string} base64
 * @param {string} fileName
 * @returns {File}
 */
export const base64ToFile = (base64: string, fileName: string) => {
    const arr = base64.split(',');
    const type = arr[0].match(/:(.*?);/)![1];
    const suffix = type.split('/')[1];
    const str = atob(arr[1]);
    let { length } = str;
    const u8arr = new Uint8Array(length);
    while (length--) {
        u8arr[length] = str.charCodeAt(length);
    }
    return new File([u8arr], `${fileName}.${suffix}`, { type });
};
