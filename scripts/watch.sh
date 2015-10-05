#!/bin/sh

node_modules/.bin/watchify src/index.jsx \
  --detect-globals false \
  --extension=.jsx \
  --external react \
  --outfile 'node_modules/.bin/derequire > build/index.js' \
  --standalone RangeSlider \
  --transform [ babelify ] \
  -t brfs \
  --verbose