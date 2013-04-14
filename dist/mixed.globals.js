/*! mixed 0.1.0 Copyright (c) 2013 Alan Plum. MIT licensed. */
(function(root){var require=function(key){return root[key];},exports=(root.mixed={});
var copyProperty = (
    typeof Object.defineProperty === 'function'
    && typeof Object.getOwnPropertyDescriptor === 'function'
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

function mixable(ctor) {
    return function(obj) {
        if (typeof obj === 'undefined') {
            return new ctor();
        }
        return mixin(ctor, obj);
    }
}
exports.mixable = mixable;}(this));
