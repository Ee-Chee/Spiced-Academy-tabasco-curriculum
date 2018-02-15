# Twitter API - Part 2

Get headlines from two additional news sources of your choosing. The requests for tweets from all three news sources should be made simultaneously. The combined list of tweets that you send to the client should be sorted in reverse chronological order. You should also append to each tweet the name of the source in parentheses.

Once again, you should not alter your original ticker Javascript to do this. That is, you should not make three ajax requests and then merge the results on the client. The server should make three simultaneous requests to get tweets and send back a merged list of tweets in response to the single ajax request it received.

Note: this task will be made much easier if you use [promises](wk6_promises).
