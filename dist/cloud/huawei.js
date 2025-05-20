"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageInfo = exports.formatImage = exports.resizeImage = void 0;
var resizeImage = function (_a) {
    var url = _a.url, _b = _a.type, type = _b === void 0 ? '*' : _b, size = _a.size;
    var _c = Array.isArray(size) ? size : [size, size], w = _c[0], h = _c[1];
    return "".concat(url, "?x-image-process=image/resize,m_lfit,").concat(type !== '*' ? "".concat(type, "_").concat(w) : "w_".concat(w, ",h_").concat(h));
};
exports.resizeImage = resizeImage;
var formatImage = function (url, format) {
    if (format === void 0) { format = 'png'; }
    return "".concat(url, "?x-image-process=image/format,").concat(format);
};
exports.formatImage = formatImage;
var imageInfo = function (url) { return "".concat(url, "?x-image-process=image/info"); };
exports.imageInfo = imageInfo;
