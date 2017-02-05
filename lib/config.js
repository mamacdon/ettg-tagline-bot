"use strict";

const ms = require("ms");
const env = process.env;

const interval              = ms(env.INTERVAL || "8 hours");
const tweetOnStart          = (env.TWEET_ON_START === "true");
const twitConsumerKey       = env.CONSUMER_KEY;
const twitConsumerSecret    = env.CONSUMER_SECRET;
const twitAccessToken       = env.ACCESS_TOKEN;
const twitAccessTokenSecret = env.ACCESS_TOKEN_SECRET;

isNaN(interval)        && fail("bad interval " + env.INTERVAL);
!twitConsumerKey       && fail("twitConsumerKey");
!twitConsumerSecret    && fail("twitConsumerSecret");
!twitAccessToken       && fail("twitAccessToken");
!twitAccessTokenSecret && fail("twitAccessTokenSecret");

module.exports = {
    interval,
    tweetOnStart,
    twitConsumerKey,
    twitConsumerSecret,
    twitAccessToken,
    twitAccessTokenSecret
};

function fail(msg) {
    throw new Error(msg);
}