#!/usr/bin/env sh

# abort on errors
set -e

CURRENTDIR=${PWD##*/}
PARRENTDIR=$(basename ${PWD%/*})

echo "module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
    ? '/$PARRENTDIR-$CURRENTDIR/'
    : '/',
  };" > vue.config.js

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
git remote add origin git@github.com:brojor/$PARRENTDIR-$CURRENTDIR.git
git push -f origin master:gh-pages