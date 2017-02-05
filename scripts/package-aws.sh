#!/bin/bash
APP_DIR=$(cd `dirname $0`/.. && pwd)
FILE=ettg-tagline-bot.zip

cd $APP_DIR
npm prune --production

zip -r $FILE . -x .git
mv $FILE ../
(cd ../ && echo "Wrote package to: " $(pwd)/$FILE)