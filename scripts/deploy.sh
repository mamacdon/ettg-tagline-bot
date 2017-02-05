#!/bin/bash
APP_NAME=ettg-tagline-bot
APP_DIR=$(cd `dirname $0`/.. && pwd)

function load_secrets() {
    WINHOME=$HOME
    if [ -L "$HOME/winhome" ]; then
        WINHOME=$HOME/winhome
    fi
    source $WINHOME/.ssh/ettg-tagline-generator.sh
}

# Create app if necessary
function create_app() {
    if ! cf app $APP_NAME > /dev/null 2>&1; then
        echo "Creating app..."
        cf push $APP_NAME -m 64M --no-route --no-start
    fi
}

function set_envs() {
    for NAME in $(env | grep -e '^CF_' | cut -c4- | cut -d= -f1 ); do
        cf set-env $APP_NAME "$NAME" "${!NAME}"
    done
}

function push_app() {
    cf push $APP_NAME -m 64M -b sdk-for-nodejs --no-route
}

(
    cd $APP_DIR
    load_secrets
    create_app
    set_envs
    push_app
)