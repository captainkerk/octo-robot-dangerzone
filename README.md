# octo-robot-dangerzone

This app is designed to use an AWS DynamoDB instance. The app performs all basic 'CRUD' operations.

It requires a file called 'aws.config'. The location of this file is changeable in the app.js file 

The aws.config file must contain your AWS credentials in JSON format. Example:

{ "accessKeyId": "awskey", "secretAccessKey": "awsSecretKey", "region": "us-west-1" }

# To use:
nodejs app.js
