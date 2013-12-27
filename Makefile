MOCHA=./node_modules/.bin/mocha
MOCHA_OPTS=--timeout 4000 test/*/*-test.js test/*-test.js
REPORTER=spec

check: test

test: test-unit

test-unit:
	    @NODE_ENV=test MOCK=on $(MOCHA) --reporter $(REPORTER) $(MOCHA_OPTS)

test-cov:
	    @NODE_ENV=test MOCK=on $(MOCHA) --require blanket --reporter html-cov > coverage.html

 .PHONY: test
