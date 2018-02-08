"use strict";
const logger = require("winston");

class Bot {
    constructor(config) {
        this.twit = config.twit;
        this.gen = config.gen;
    }

    tweet() {
        const statusLong = this.gen.string();
        const status = truncate(statusLong);
        if (status !== statusLong) {
            logger.info("Truncated status '%s' to '%s'", status, statusLong);
        }
        logger.debug("Posting tweet: '%s'", status);
        return wrapTwitterCall(
            this.twit.post("statuses/update", { status: status }),
            status
        );
    }
}

// twit does not reject promise on Twitter API error (for example credentials rejected). This wrapper does
function wrapTwitterCall(promise, status) {
    return promise
    .then(reply => {
        if (reply.data && Array.isArray(reply.data.errors) && reply.data.errors.length) {
            reply.status = status;
            throw reply;
        }
        return reply;
    });
}

const maxTweetLength = 200; // #never280
function truncate(s) {
    // TODO technically we should perform unicode normalization here and count code points
    if (s.length <= maxTweetLength) {
        return s;
    }
    // find a word boundary to break at
    let idx = maxTweetLength;
    while (/\S/.test(s[idx])) {
        idx--;
    }
    return s.slice(0, idx);
}

module.exports = Bot;