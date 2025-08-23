.PHONY: dev build clean

install:
	bundle install

# Development target - Jekyll server only (Tailwind via CDN)
dev:
	@echo "Starting development environment..."
	@echo "Starting Jekyll server..."
	bundle exec jekyll serve

# Build for production
build:
	@echo "Building Jekyll site..."
	bundle exec jekyll build

# Clean generated files
clean:
	bundle exec jekyll clean