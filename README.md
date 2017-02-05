Uses ettg-tagline-generator to tweet random taglines on a schedule.

### Usage
Set environment variables, then run:

    npm start

### Running in the cloud
* See `scripts/deploy.sh` for an example deployment script to CloudFoundry.
* See `lambda.js` for an example of how to package this app as an AWS Lambda handler.

### Environment variables
Twit stuff

    ACCESS_TOKEN          Twitter access token
    ACCESS_TOKEN_SECRET   Twitter access token secret
    CONSUMER_KEY          Twitter consumer key
    CONSUMER_SECRET       Twitter consumer secret

Bot behavior

    INTERVAL              time value parseable by `ms` library (default: "8 hours")
    TWEET_ON_START        true | false (default: false)

### License
ISC
