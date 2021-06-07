"use strict";
exports.__esModule = true;
var xhr_1 = require("../xhr");
var url_1 = require("../helpers/url");
var headers_1 = require("../helpers/headers");
var data_1 = require("../helpers/data");
function dispatchRequest(config) {
    processConfig(config);
    return xhr_1["default"](config).then(function (res) {
        return transformResponseData(res);
    });
}
exports["default"] = dispatchRequest;
function processConfig(config) {
    config.url = transformUrl(config);
    config.headers = transformHeaders(config);
    config.data = transformData(config);
}
function transformUrl(config) {
    var url = config.url, params = config.params;
    return url_1.buildURL(url, params);
}
function transformHeaders(config) {
    var _a = config.headers, headers = _a === void 0 ? {} : _a, _b = config.data, data = _b === void 0 ? {} : _b;
    return headers_1.processHeaders(headers, data);
}
function transformData(config) {
    return data_1.transformRequest(config.data);
}
function transformResponseData(res) {
    res.data = data_1.transformResponse(res.data);
    return res;
}
