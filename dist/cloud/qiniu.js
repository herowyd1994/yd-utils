"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avinfo = exports.vframe = exports.avthumb = exports.imageInfo = exports.imageView2 = void 0;
var imageView2 = function (_a) {
    var url = _a.url, _b = _a.type, type = _b === void 0 ? '*' : _b, size = _a.size, _c = _a.format, format = _c === void 0 ? 'png' : _c, _d = _a.interlace, interlace = _d === void 0 ? true : _d;
    var _e = Array.isArray(size) ? size : [size, size], w = _e[0], h = _e[1];
    return "".concat(url, "?imageView2/").concat(type !== '*' ? "2/".concat(type, "/").concat(w) : "1/w/".concat(w, "/h/").concat(h), "/format/").concat(format, "/interlace/").concat(Number(interlace));
};
exports.imageView2 = imageView2;
var imageInfo = function (url) { return "".concat(url, "?imageInfo"); };
exports.imageInfo = imageInfo;
var avthumb = function (url, format, start, time) {
    if (format === void 0) { format = 'mp4'; }
    if (start === void 0) { start = 0; }
    if (time === void 0) { time = 60; }
    return "".concat(url, "?avthumb/").concat(format, "/ss/").concat(start, "/t/").concat(time);
};
exports.avthumb = avthumb;
var vframe = function (url, size, offset, format) {
    if (offset === void 0) { offset = 0; }
    if (format === void 0) { format = 'png'; }
    var _a = Array.isArray(size) ? size : [size, size], w = _a[0], h = _a[1];
    return "".concat(url, "?vframe/").concat(format, "/offset/").concat(offset, "/w/").concat(w, "/h/").concat(h);
};
exports.vframe = vframe;
var avinfo = function (url) { return "".concat(url, "?avinfo"); };
exports.avinfo = avinfo;
