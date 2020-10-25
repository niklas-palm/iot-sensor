# IoT sensor real-time dashboard

This repo contains the code for both the frontend and the backend of a real-time IoT sensor system.

## Installation

### Pre-requisites

- Valid AWS credentials
- AWS SAM installed

### Installation guide

Deploy CloudFormation template in `iot-backend` using AWS SAM. Save arguments to .toml file

```bash
sam build && sam deploy --guided
```

When deploy fails, enter `capabilities = "CAPABILITY_NAMED_IAM"` instead of `capabilities = "CAPABILITY_IAM"` in .toml, and run

```bash
sam deploy
```

To set up the frontend, Create an `aws-exports.js` file based on the template in `frontend/aws-exports-template.js` and populate with the values obtained deploying the CloudFormation template above.
