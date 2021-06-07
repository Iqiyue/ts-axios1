"use strict";
exports.__esModule = true;
exports.buildURL = void 0;
var util_1 = require("./util");
var encode = function (val) {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
};
function buildURL(url, params) {
    if (!params) {
        return url;
    }
    var parts = [];
    Object.keys(params).forEach(function (key) {
        var val = params[key];
        // todo 是undefined 或者null 排除掉
        if (val === null || val === undefined) {
            return;
        }
        var values;
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        }
        else {
            values = [val];
        }
        values.forEach(function (val) {
            // todo 判断val类型,处理后添加到数组
            if (util_1.isDate(val)) {
                val = val.toISOString();
            }
            else if (util_1.isPlainObject(val)) {
                val = JSON.stringify(val);
            }
            parts.push(encode(key) + " = " + encode(val));
        });
    });
    var serializedParams = parts.join('&');
    if (serializedParams) {
        var markIndex = url.indexOf('#');
        if (markIndex !== -1) {
            url.slice(0, markIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}
exports.buildURL = buildURL;
