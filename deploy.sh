#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка
npm run build

cd dist


git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/BOD5/vue-calendar.github.io.git master:gh-pages

cd -