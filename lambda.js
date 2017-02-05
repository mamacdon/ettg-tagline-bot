"use strict";
const botFactory = require("./lib/bot-factory");
const logger = require("winston");
const bot = botFactory();

exports.handler = function(event, context, callback) {
    logger.info("Tweeting (time: %s)", new Date());

    bot.tweet()
    .then(reply => {
        const text = getText(reply);
        logger.info("Successfully tweeted: id %s, text '%s'", reply.data.id, text);
        callback(null, text);
    })
    .catch(reply => {
        logger.error("Error tweeting '%s': %s", reply.status, JSON.stringify(getError(reply)));
        callback(getError(reply));
    });
};

const getText = (reply) => reply.data && reply.data.text;
const getError = (reply) => reply.data && reply.data.errors && reply.data.errors[0];
