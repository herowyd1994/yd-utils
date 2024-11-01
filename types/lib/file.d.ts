import { DownloadFileConfig } from '../types';
export declare const downloadFile: (url: string, fileName: string, { onError, ...config }?: DownloadFileConfig) => Promise<void>;
export declare const selectFile: (type?: "single" | "multiple", accept?: string) => Promise<FileList>;
export declare const transformFileType: (blob: Blob, type: "arrayBuffer" | "binary" | "base64") => Promise<string | ArrayBuffer>;
export declare const urlToBase64: (url: string, { onError, ...config }?: DownloadFileConfig) => Promise<string | ArrayBuffer>;
export declare const base64ToFile: (base64: string, fileName: string) => File;
