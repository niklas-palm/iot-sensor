## Backend

The cloudformation template provisions some AWS resources:

- Cognito userpool and identitypool, with assosciated authorised and unauthorised IAM roles.
- DynamoDb table to hold the sensors and their values, specified as the data source for the AppSync api.
- AppSync api and IAM role to enable access to DynamoDb.
- AppSync GraphQL Schema and corresponding resolvers.
- A Lambda function, triggered by messages on the IoT Topic specified as a parameter above.
