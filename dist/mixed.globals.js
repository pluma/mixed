/*! mixed 0.4.0 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
(function(root){var require=function(key){return root[key];},exports=(root.mixed={});
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

function mixin(Ctor, obj) {
    var proto = Ctor.prototype;
    var args = Array.prototype.slice.call(arguments, 2);
    for (var key in proto) {
        if (proto.hasOwnProperty(key)) {
            copyProperty(obj, key, proto);
        }
    }
    Ctor.apply(obj, args);
    return obj;
}
exports.mixin = mixin;

function mixable(Ctor) {
    var args = Array.prototype.slice.call(arguments, 1);
    function Mixable(obj) {
        if (typeof obj === 'undefined') {
            return new Ctor();
        }
        return mixin.apply(null, [Ctor, obj].concat(args));
    }
    Mixable.prototype = Ctor.prototype;
    return Mixable;
}
exports.mixable = mixable;}(this));
