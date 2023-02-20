# GEUSSWORD
Wordle clone, built with React and AWS.
A few notes on the backend:
In an S3 bucket I have a JSON file containing the full list of possible answers. Every 24 hours, at 00:00 EST, a scheduled CloudWatch Event fires a Lambda function that selects a random word from the list
in the S3 bucket, and stores it in a DynamoDB table. When the frontend app loads, it makes a /GET request
to an HTTP server set up in a separate Lambda that retrieves the word of the day from the db.
 Play at https://guessword.ngm01.com/
