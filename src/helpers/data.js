"use strict";
exports.__esModule = true;
exports.transformResponse = exports.transformRequest = void 0;
var util_1 = require("./util");
function transformRequest(data) {
    if (util_1.isPlainObject(data)) {
        return JSON.stringify(data);
    }
    else {
        return data;
    }
}
exports.transformRequest = transformRequest;
function transformResponse(data) {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        }
        catch (e) {
            // do nothing
        }
    }
    return data;
}
exports.transformResponse = transformResponse;
