"use strict";
const config = require("./config");
const botFactory = require("./bot-factory");
const logger = require("winston");

const bot = botFactory();

if (config.tweetOnStart) {
    wake();
} else {
    logger.info("Will wake in %d hours", msToHour(config.interval));
}
setInterval(wake, config.interval);

function wake() {
    logger.info("Woke up at %s", new Date());
    bot.tweet()
    .then(reply => {
        logger.info("Successfully tweeted: id %s, text '%s'", reply.data.id, reply.data.text);
    })
    .catch(reply => {
        logger.error("Error tweeting '%s': %s", reply.status, JSON.stringify(reply.data.errors));
    })
    .finally(() => logger.info("Next wake in ~%d hours", msToHour(config.interval)));
}

function msToHour(ms) {
    return ms / (1e3 * 3600)
}