/*global describe, it */
var expect = require('expect.js'),
    mixed = require('../dist/mixed.js');

function getKeys(obj) {
    var result = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(key);
        }
    }
    return result;
}

describe('mixable', function() {
    var mixable = mixed.mixable;

    function Liquor() {
        this.alcoholContent = 0.8;
    }
    Liquor.prototype = {
        burn: function() {
            this.alcoholContent *= 0.5;
        }
    };
    var MixableLiquor = mixable(Liquor);

    function Cocktail() {
        this.blended = false;
    }
    Cocktail.prototype = {
        blend: function() {
            this.blended = true;
        }
    };
    
    it('shares the prototype', function() {
        expect(MixableLiquor.prototype).to.equal(Liquor.prototype);
    });
    
    describe('when instantiated with no arguments', function() {
        var mixedLiquor = new MixableLiquor();
        it('acts as a regular instance', function() {
            expect(mixedLiquor).to.be.a(Liquor);
        });
    });
    
    describe('when used as a mixin', function() {
        var trueLiquor = new Liquor();
        var trueCocktail = new Cocktail();
        var mixedCocktail = MixableLiquor(new Cocktail());

        it('has all properties of the mixed-in prototype', function() {
            var keys = getKeys(Liquor.prototype);
            expect(mixedCocktail).to.have.keys(keys);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                expect(mixedCocktail).to.have.property(key, Liquor.prototype[key]);
            }
        });

        it('has all properties from the mixed-in constructor', function() {
            var keys = getKeys(trueLiquor);
            expect(mixedCocktail).to.have.keys(keys);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                expect(mixedCocktail).to.have.property(key, trueLiquor[key]);
            }
        });

        it('still acts as a regular instance', function() {
            expect(mixedCocktail).to.be.a(Cocktail);
        });

        it('still has all properties from its own constructor', function() {
            var keys = getKeys(trueCocktail);
            expect(mixedCocktail).to.have.keys(keys);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                expect(mixedCocktail).to.have.property(key, trueCocktail[key]);
            }
        });

        it('invokes the mixed-in constructor with the given arguments', function() {
            var args = ['a', 'b', 'c'];
            function ctor() {
                var actualArgs = Array.prototype.slice.call(arguments, 0);
                expect(actualArgs).to.eql(args);
            }
            mixed.mixable.apply(null, [ctor].concat(args))({});
        });
    });
});