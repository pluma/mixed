LICENSE_COMMENT="/*! mixed 0.3.2 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */"

test:
	@./node_modules/.bin/mocha \
		--growl \
		--reporter spec \
		spec/*.spec.js

clean:
	@rm -rf dist

dist/vendor: clean
	@mkdir -p dist/vendor

dist/mixed.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/mixed.js
	@cat src/mixed.js >> dist/mixed.js

dist/mixed.globals.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/mixed.globals.js
	@echo "(function(root){\
	var require=function(key){return root[key];},\
	exports=(root.mixed={});" >> dist/mixed.globals.js
	@cat src/mixed.js >> dist/mixed.globals.js
	@echo "}(this));" >> dist/mixed.globals.js

dist/mixed.amd.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/mixed.amd.js
	@echo "define(function(require, exports) {" >> dist/mixed.amd.js
	@cat src/mixed.js >> dist/mixed.amd.js
	@echo "});" >> dist/mixed.amd.js

dist/mixed.min.js: dist/mixed.js
	@./node_modules/.bin/uglifyjs dist/mixed.js > dist/mixed.min.js

dist/mixed.globals.min.js: dist/mixed.globals.js
	@./node_modules/.bin/uglifyjs dist/mixed.globals.js > dist/mixed.globals.min.js

dist/mixed.amd.min.js: dist/mixed.amd.js
	@./node_modules/.bin/uglifyjs dist/mixed.amd.js > dist/mixed.amd.min.js

dist: dist/mixed.min.js dist/mixed.globals.min.js dist/mixed.amd.min.js

lint:
	@./node_modules/.bin/jshint src/mixed.js spec

.PHONY: lint test clean
