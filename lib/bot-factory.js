"use strict";
const logger = require("winston");
const config = require("./config");
const Bot = require("./bot");
const Twit = require("twit");
const Generator = require("ettg-tagline-generator"); // warning: heavy sync work

module.exports = function() {
    logger.info("Creating twit and generator");
    const twit = new Twit({
        consumer_key:        config.twitConsumerKey,
        consumer_secret:     config.twitConsumerSecret,
        access_token:        config.twitAccessToken,
        access_token_secret: config.twitAccessTokenSecret
    });
    const gen = new Generator();

    logger.info("Creating bot")
    const bot = new Bot({
        twit: twit,
        gen: gen
    });

    return bot;
};
