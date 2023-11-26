install:
	npm ci

lint:
	npx eslint .

test:
	npm jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

.PHONY: test
