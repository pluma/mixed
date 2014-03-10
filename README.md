# Synopsis

**mixed** is a minimalist, lightweight, ES3-compatible function to mix Constructor functions and their prototypes into instance objects.

[![stability 3 - stable](http://b.repl.ca/v1/stability-3_--_stable-yellowgreen.png)
](http://nodejs.org/api/documentation.html#documentation_stability_index) [![license - Unlicense](http://b.repl.ca/v1/license-Unlicense-lightgrey.png)](http://unlicense.org/) [![Flattr this](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=pluma&url=https://github.com/pluma/mixed)

[![browser support](https://ci.testling.com/pluma/mixed.png)](https://ci.testling.com/pluma/mixed)

[![Build Status](https://travis-ci.org/pluma/mixed.png?branch=master)](https://travis-ci.org/pluma/mixed) [![Coverage Status](https://coveralls.io/repos/pluma/mixed/badge.png?branch=master)](https://coveralls.io/r/pluma/mixed?branch=master) [![Dependencies](https://david-dm.org/pluma/mixed.png?theme=shields.io)](https://david-dm.org/pluma/mixed)

[![NPM status](https://nodei.co/npm/mixed.png?compact=true)](https://npmjs.org/package/mixed)

# Rationale

There are seem to be two common approaches to dealing with mixins:

1. Mixins are special constructor functions that take an optional instance argument to augment an existing instance rather than the `this` context. This makes for very nice syntax, but requires the author to support mixing intentionally.

2. Mixins are just collections of methods. In this case mixing is practically equivalent to the functionality already provided by [aug](https://github.com/jgallen23/aug) or jQuery's `$.extend` function.

The first approach (used by many libraries in [component](https://github.com/component/component)) provides a lot of power and flexibility, representing the same functionality mixins provide in class-based languages. However, the overhead of providing a mixin mechanism for each constructor individually seems obviously redundant.

Additionally, modifying the constructor's argument list to allow using it as a mixin seems both intrusive and limitting, as many constructors would normally expect to be passed a configuration object or initial parameters.

**mixed** tries to solve this issue by both providing a standalone mixin function, to allow mixing any given constructor into any given object, and also providing a thin wrapper interface to turn any plain old argument-free constructor function into a component-style mixin that can be called either as a constructor (with the `new` keyword) or with an object to mix into (as the sole argument).

# Install

## Node.js

### With NPM

```sh
npm install mixed
```

### From source

```sh
git clone https://github.com/pluma/mixed.git
cd mixed
npm install
make && make dist
```

## Browser

### With component

```sh
component install pluma/mixed
```

[Learn more about component](https://github.com/component/component).

### With bower

```sh
bower install mixed
```

[Learn more about bower](https://github.com/twitter/bower).

### With a CommonJS module loader

Download the [latest minified CommonJS release](https://raw.github.com/pluma/mixed/master/dist/mixed.min.js) and add it to your project.

[Learn more about CommonJS modules](http://wiki.commonjs.org/wiki/Modules/1.1).

### With an AMD module loader

Download the [latest minified AMD release](https://raw.github.com/pluma/mixed/master/dist/mixed.amd.min.js) and add it to your project.

[Learn more about AMD modules](http://requirejs.org/docs/whyamd.html).

### As a standalone library

Download the [latest minified standalone release](https://raw.github.com/pluma/mixed/master/dist/mixed.globals.min.js) and add it to your project.

```html
<script src="/your/js/path/mixed.globals.min.js"></script>
```

This makes the `mixed` module available in the global namespace.

# Basic `mixin` usage example

```javascript
function Liquor() {
    this.alcoholContent = 0.8;
}
Liquor.prototype = {
    burn: function() {
        this.alcoholContent *= 0.5;
        if (this.alcoholContent > 0.2) {
            console.log('*FOOSH*');
        } else {
            console.log('*fizzle*');
        }
    }
};

var cocktail = {};
console.log(cocktail.alcoholContent); // undefined
console.log(cocktail.burn); // undefined

mixed.mixin(Liquor, cocktail);
console.log(cocktail.alcoholContent); // 0.8
cocktail.burn(); // *FOOSH*
console.log(cocktail.alcoholContent); // 0.4
```

# Basic `mixable` usage example

```javascript
function Liquor() {
    this.alcoholContent = 0.8;
}
Liquor.prototype = {
    burn: function() {
        this.alcoholContent *= 0.5;
        if (this.alcoholContent > 0.2) {
            console.log('*FOOSH*');
        } else {
            console.log('*fizzle*');
        }
    }
};
Liquor = mixed.mixable(Liquor);

var cocktail = {};
console.log(cocktail.alcoholContent); // undefined
console.log(cocktail.burn); // undefined

Liquor(cocktail);
console.log(cocktail.alcoholContent); // 0.8
cocktail.burn(); // *FOOSH*
console.log(cocktail.alcoholContent); // 0.4
```

# API

## mixin(ctor:Function, obj, args…):Object

Applies the given constructor to the given object and returns the object.

Copies each of the constructor's prototype's properties to the given object, then calls the constructor as a function with the object as its context (`this`).

Any additional arguments will be passed to the constructor function.

**NOTE**: If you simply want to merge two instances rather than messing with constructors and prototypes, consider using [aug](https://github.com/jgallen23/aug) instead.

## mixable(ctor:Function, args…):Function

Creates a wrapper around the given constructor function that can be called either as a constructor (using the `new` keyword) or as a mixin (with the object to mix into as the sole argument). The constructor's prototype will be copied over to the wrapper function.

If called as a mixin, this wrapper behaves exactly as if `mixin` was called directly.

# Acknowledgments

This library was influenced by [TJ Holowaychuk](https://github.com/visionmedia)'s work on [component](https://github.com/component/component).

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/mixed/blob/master/UNLICENSE) file.
