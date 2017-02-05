const winston = require("winston");

module.exports = Bot;

class Bot {
    constructor(config) {
        this.twit = config.twit;
        this.gen = config.gen;
    }

    tweet(status) {
        winston.info("Posting tweet: " + status)
        return this.twit.post("statuses/update", { status: status });
    }
}