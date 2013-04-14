# Synopsis

**mixed** is a minimalist, lightweight, ES5-compatible function to mix Constructor functions and their prototypes into instance objects.

# Rationale

There are seem to be two common approaches to dealing with mixins:

1. Mixins are special constructor functions that take an optional instance argument to augment an existing instance rather than the `this` context. This makes for very nice syntax, but requires the author to support mixing intentionally.

2. Mixins are just collections of methods. In this case mixing is practically equivalent to the functionality already provided by [aug](https://github.com/jgallen23/aug) or jQuery's `$.extend` function.

The first approach (used by many libraries in [component](https://github.com/component/component)) provides a lot of power and flexibility, representing the same functionality mixins provide in class-based languages. However, the overhead of providing a mixin mechanism for each constructor individually seems obviously redundant.

Additionally, modifying the constructor's argument list to allow using it as a mixin seems both intrusive and limitting, as many constructors would normally expect to be passed a configuration object or initial parameters.

**mixed** tries to solve this issue by both providing a standalone mixin function, to allow mixing any given constructor into any given object, and also providing a thin wrapper interface to turn any plain old argument-free constructor function into a component-style mixin that can be called either as a constructor (with the `new` keyword) or with an object to mix into (as the sole argument).

# Basic usage example

```javascript
// TODO
```

# API

## mixin(mixin:Function, obj):Object

Applies the given mixin to the given object and returns the object.

Copies each of the mixin's prototype's properties to the given object, then calls the mixin as a function with the object as its context (`this`).

**NOTE**: If you simply want to merge two instances rather than messing with constructors and prototypes, consider using [aug](https://github.com/jgallen23/aug) instead.

## mixable(ctor:Function):Function

Creates a wrapper around the given constructor function that can be called either as a constructor (using the `new` keyword) or as a mixin (with the object to mix into as the sole argument).

If called as a mixin, this wrapper behaves exactly as if `mixin` was called directly.

#Acknowledgments

This library was influenced by [TJ Holowaychuk](https://github.com/visionmedia)'s work on [component](https://github.com/component/component).

# License

The MIT/Expat license.