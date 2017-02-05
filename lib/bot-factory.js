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



// if (config.tweetOnStart) {
//     wake();
// } else {
//     logger.info("Will wake in %d hours", msToHour(config.interval));
// }
// setInterval(wake, config.interval);

// function wake() {
//     logger.info("Woke up at %s", new Date());
//     const tagline = gen.string();
//     const tagline2 = truncate(tagline);
//     if (tagline !== tagline2) {
//         logger.info("Truncated tagline '%s' to '%s'", tagline, tagline2);
//     }

//     bot.tweet(tagline2)
//     .then(reply => {
//         logger.info("Successfully tweeted: id %s, text '%s'", reply.data.id, reply.data.text);
//     })
//     .catch(reply => {
//         logger.error("Error tweeting '%s': %s", tagline2, JSON.stringify(reply.data.errors));
//     })
//     .finally(() => logger.info("Next wake in ~%d hours", msToHour(config.interval)));
// }

// // TODO technically we should perform unicode normalization here and count code points
// function truncate(s) {
//     if (s.length <= 140) {
//         return s;
//     }
//     // find a word boundary to break at
//     let idx = 140;
//     while (/\S/.test(s[idx])) {
//         idx--;
//     }
//     return s.slice(0, idx);
// }

// function msToHour(ms) {
//     return ms / (1e3 * 3600)
// }
