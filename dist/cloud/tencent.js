"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageInfo = exports.imageMogr2 = void 0;
var imageMogr2 = function (_a) {
    var url = _a.url, _b = _a.type, type = _b === void 0 ? '*' : _b, size = _a.size, _c = _a.format, format = _c === void 0 ? 'png' : _c, _d = _a.interlace, interlace = _d === void 0 ? true : _d;
    var _e = Array.isArray(size) ? size : [size, size], w = _e[0], h = _e[1];
    return "".concat(url, "?imageMogr2/thumbnail/").concat(type === 'w' ? "".concat(w, "x")
        : type === 'h' ? "x".concat(w)
            : "".concat(w, "x").concat(h), "/format/").concat(format, "/interlace/").concat(Number(interlace));
};
exports.imageMogr2 = imageMogr2;
var imageInfo = function (url) { return "".concat(url, "?imageInfo"); };
exports.imageInfo = imageInfo;
