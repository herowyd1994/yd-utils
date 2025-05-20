"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoInfo = exports.snapshotsVideo = exports.convertVideo = exports.imageInfo = exports.formatImage = exports.resizeImage = void 0;
var resizeImage = function (_a) {
    var url = _a.url, _b = _a.type, type = _b === void 0 ? '*' : _b, size = _a.size;
    var _c = Array.isArray(size) ? size : [size, size], w = _c[0], h = _c[1];
    return "".concat(url, "?x-oss-process=image/resize,m_fill,").concat(type !== '*' ? "".concat(type, "_").concat(w) : "w_".concat(w, ",h_").concat(h));
};
exports.resizeImage = resizeImage;
var formatImage = function (url, format) {
    if (format === void 0) { format = 'png'; }
    return "".concat(url, "?x-oss-process=image/format,").concat(format);
};
exports.formatImage = formatImage;
var imageInfo = function (url) { return "".concat(url, "?x-oss-process=image/info"); };
exports.imageInfo = imageInfo;
var convertVideo = function (url, start, time, format) {
    if (start === void 0) { start = 0; }
    if (time === void 0) { time = 60; }
    if (format === void 0) { format = 'mp4'; }
    return "".concat(url, "?x-oss-async-process=video/convert,ss_").concat(start, ",t_").concat(time * 1000, ",f_").concat(format);
};
exports.convertVideo = convertVideo;
var snapshotsVideo = function (url, size, start, format) {
    if (start === void 0) { start = 0; }
    if (format === void 0) { format = 'png'; }
    var _a = Array.isArray(size) ? size : [size, size], w = _a[0], h = _a[1];
    return "".concat(url, "?x-oss-async-process=video/snapshots,scaletype_fit,w_").concat(w, ",h_").concat(h, ",ss_").concat(start, ",f_").concat(format);
};
exports.snapshotsVideo = snapshotsVideo;
var videoInfo = function (url) { return "".concat(url, "?x-oss-process=video/info"); };
exports.videoInfo = videoInfo;
