"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToFile = exports.urlToBase64 = exports.transformFileType = exports.selectFile = exports.downloadFile = void 0;
var downloadFile = function (url_1, fileName_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([url_1, fileName_1], args_1, true), void 0, function (url, fileName, _a) {
        var href, _b, _c, a;
        if (_a === void 0) { _a = { onError: function (_a) {
                var message = _a.message;
                return alert(message);
            } }; }
        var onError = _a.onError, config = __rest(_a, ["onError"]);
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _c = (_b = URL).createObjectURL;
                    return [4, fetch(url, config).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(res.status >= 400)) return [3, 2];
                                        _a = onError;
                                        return [4, res.json()];
                                    case 1:
                                        _a.apply(void 0, [_b.sent()]);
                                        return [2, Promise.reject()];
                                    case 2: return [2, res.blob()];
                                }
                            });
                        }); })];
                case 1:
                    href = _c.apply(_b, [_d.sent()]);
                    a = document.createElement('a');
                    a.href = href;
                    a.download = fileName;
                    a.click();
                    URL.revokeObjectURL(href);
                    return [2];
            }
        });
    });
};
exports.downloadFile = downloadFile;
var selectFile = function (type, accept) {
    if (type === void 0) { type = 'single'; }
    if (accept === void 0) { accept = '*'; }
    return new Promise(function (resolve) {
        var input = document.createElement('input');
        input.accept = accept;
        input.type = 'file';
        input.multiple = type === 'multiple';
        input.click();
        input.onchange = function (_a) {
            var target = _a.target;
            return resolve(target.files);
        };
    });
};
exports.selectFile = selectFile;
var transformFileType = function (blob, type) {
    return new Promise(function (resolve) {
        var fr = new FileReader();
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
        fr.onload = function () { return resolve(fr.result); };
    });
};
exports.transformFileType = transformFileType;
var urlToBase64 = function (url_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([url_1], args_1, true), void 0, function (url, _a) {
        var _b;
        if (_a === void 0) { _a = { onError: function (_a) {
                var message = _a.message;
                return alert(message);
            } }; }
        var onError = _a.onError, config = __rest(_a, ["onError"]);
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = exports.transformFileType;
                    return [4, fetch(url, config).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(res.status >= 400)) return [3, 2];
                                        _a = onError;
                                        return [4, res.json()];
                                    case 1:
                                        _a.apply(void 0, [_b.sent()]);
                                        return [2, Promise.reject()];
                                    case 2: return [2, res.blob()];
                                }
                            });
                        }); })];
                case 1: return [2, _b.apply(void 0, [_c.sent(), 'base64'])];
            }
        });
    });
};
exports.urlToBase64 = urlToBase64;
var base64ToFile = function (base64, fileName) {
    var arr = base64.split(',');
    var type = arr[0].match(/:(.*?);/)[1];
    var suffix = type.split('/')[1];
    var str = atob(arr[1]);
    var length = str.length;
    var u8arr = new Uint8Array(length);
    while (length--) {
        u8arr[length] = str.charCodeAt(length);
    }
    return new File([u8arr], "".concat(fileName, ".").concat(suffix), { type: type });
};
exports.base64ToFile = base64ToFile;
