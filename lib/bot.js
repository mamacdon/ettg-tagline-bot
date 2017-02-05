const winston = require("winston");

class Bot {
    constructor(config) {
        this.twit = config.twit;
        this.gen = config.gen;
    }

    tweet(status) {
        winston.debug("Posting tweet: '%s'", status)
        return this.twit.post("statuses/update", { status: status })
        .then(reply => {
            if (!reply.data || !Array.isArray(reply.data.errors) || !reply.data.errors.length) {
                return reply;
            }
            throw reply; // twitter error
        });
    }
}

module.exports = Bot;