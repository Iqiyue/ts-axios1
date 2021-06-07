"use strict";
exports.__esModule = true;
var headers_1 = require("./helpers/headers");
var error_1 = require("./helpers/error");
function xhr(config) {
    return new Promise(function (resolve, reject) {
        var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, _b = config.method, method = _b === void 0 ? 'get' : _b, headers = config.headers, responseType = config.responseType, timeout = config.timeout;
        var request = new XMLHttpRequest();
        if (responseType) {
            request.responseType = responseType;
        }
        request.open(method.toUpperCase(), url, true);
        request.onerror = function handleError() {
            reject(error_1.createError('Network Error', config, null, request));
        };
        if (timeout) {
            request.timeout = timeout;
        }
        request.ontimeout = function handleTimeout() {
            reject(error_1.createError("Timeout of " + config.timeout + " ms exceeded", config, 'ECONNABORTED', request));
        };
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 0) {
                return;
            }
            var responseHeaders = headers_1.parseHeaders(request.getAllResponseHeaders());
            var responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            handleResponse(response);
        };
        function handleResponse(response) {
            if (response.status >= 200 && response.status < 300) {
                resolve(response);
            }
            else {
                reject(error_1.createError("Request failed with status code " + response.status, config, null, request, response));
            }
        }
        Object.keys(headers).forEach(function (name) {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            }
            else {
                request.setRequestHeader(name, headers[name]);
            }
        });
        request.send(data);
    });
}
exports["default"] = xhr;
