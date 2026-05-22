# Variables
NPM = npm

# Default Target
.PHONY: all
all: test

# Install dependencies
.PHONY: install
install:
	$(NPM) install

# Run manual tests
.PHONY: start
start:
	$(NPM) start

# Run unit tests
.PHONY: test
test:
	$(NPM) test

# Run ESLint validation
.PHONY: lint
lint:
	npx eslint .
