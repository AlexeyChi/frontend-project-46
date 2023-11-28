install:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm run jest-watch

publish:
	npm publish --dry-run

.PHONY: test
