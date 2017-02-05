#!/bin/bash
APP_NAME=ettg-tagline-bot

function load_secrets() {
    WINHOME=$HOME
    if [ -L "$HOME/winhome" ]; then
        WINHOME=$HOME/winhome
    fi
    source $WINHOME/.ssh/ettg-tagline-generator.sh
}

# Create app if necessary
function create_app() {
    if ! cf app $APP_NAME; then
        cf push -m 64M --no-route --no-start
    fi
}

function set_envs() {
    for NAME in "${!VARS[@]}"; do
        cf set-env $APP_NAME "$NAME" "${VARS[$NAME]}"
    done
}

function push_app() {
    cf push -m 64M --no-route
}

load_secrets
create_app
set_envs
push_app