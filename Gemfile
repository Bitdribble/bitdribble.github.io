# frozen_string_literal: true

source "https://rubygems.org"

# Analytiq Pages Theme
gem "analytiq-pages-theme", git: "https://github.com/analytiq-hub/analytiq-pages-theme", tag: "v1.0.6"
#gem "analytiq-pages-theme", path: "/Users/andrei/build/analytiq/analytiq-pages-theme"

# Use GitHub Pages compatible Jekyll version
gem "github-pages", group: :jekyll_plugins

# 0.23.11 does not compile on GCC 15 (GitHub-hosted Ubuntu). 0.23.12 adds that support
# and still satisfies jekyll-commonmark-ghpages (< 1.1.0).
gem "commonmarker", "0.23.12"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-pdf-embed", "1.1.2.1" # Per example at https://github.com/MihajloNesic/minimal-mistakes-pdf-example/
  gem "jekyll-paginate-v2", "~> 3.0"
end
