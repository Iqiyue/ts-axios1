"use strict";
exports.__esModule = true;
exports.isPlainObject = exports.isObject = exports.isDate = void 0;
var toString = Object.prototype.toString;
function isDate(val) {
    return toString.call(val) === '[object date]';
}
exports.isDate = isDate;
function isObject(val) {
    return val !== null && typeof val === 'object';
}
exports.isObject = isObject;
function isPlainObject(val) {
    return toString.call(val) === '[object object]';
}
exports.isPlainObject = isPlainObject;
console.log(isPlainObject({ a: 1, b: 2 }));
