.PHONY: install serve build clean

install:
	bundle install

serve:
	bundle exec jekyll serve --livereload

build:
	bundle exec jekyll build

clean:
	bundle exec jekyll clean
