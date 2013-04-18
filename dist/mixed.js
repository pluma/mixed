/*! mixed 0.2.1 Copyright (c) 2013 Alan Plum. MIT licensed. */
var copyProperty = (
    typeof Object.defineProperty === 'function' &&
    typeof Object.getOwnPropertyDescriptor === 'function'
) ? function(dest, key, src) {
    Object.defineProperty(
        dest,
        key,
        Object.getOwnPropertyDescriptor(src, key)
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
exports.mixable = mixable;