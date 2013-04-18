/*! mixed 0.3.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
define(function(require, exports) {
function isEs5() {
    if (
        typeof Object.defineProperty !== 'function' ||
        typeof Object.getOwnPropertyDescriptor !== 'function'
    ) {
        return false;
    }
    try {
        Object.defineProperty(
            {}, 'x', Object.getOwnPropertyDescriptor({y: 1}, 'y')
        );
    } catch(e) {
        return false;
    }
    return true;
}

var copyProperty = isEs5() ? function(dest, key, src) {
    Object.defineProperty(
        dest, key, Object.getOwnPropertyDescriptor(src, key)
    );
} : function(dest, key, src) {
    dest[key] = src[key];
};

function mixin(Mixin, obj) {
    var proto = Mixin.prototype;
    for (var key in proto) {
        if (proto.hasOwnProperty(key)) {
            copyProperty(obj, key, proto);
        }
    }
    Mixin.apply(obj);
    return obj;
}
exports.mixin = mixin;

function mixable(Ctor) {
    function Mixable(obj) {
        if (typeof obj === 'undefined') {
            return new Ctor();
        }
        return mixin(Ctor, obj);
    }
    Mixable.prototype = Ctor.prototype;
    return Mixable;
}
exports.mixable = mixable;});
