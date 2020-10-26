# IoT sensor real-time dashboard

This repo contains the code for both the frontend and the backend of a real-time IoT sensor system.

## Installation

### Pre-requisites

- Valid AWS credentials
- AWS SAM installed
- npm installed

### Installation guide

Deploy CloudFormation template in the folder `iot-backend` using AWS SAM. Save arguments to .toml file

```bash
sam build && sam deploy --guided
```

When deploy fails, enter `capabilities = "CAPABILITY_NAMED_IAM"` instead of `capabilities = "CAPABILITY_IAM"` in .toml, and run

```bash
sam deploy
```

This is because some of the policies and roles created are given explicit names, to make them more easily searchable. The AWS SAM cli command `sam deploy --guided` doesn't give you the option to use "CAPABILITY_NAMED_IAM" out of the box, which is why this step is necassary.

Once that has been deployed successfully, create `frontend/src/aws-exports.js`, based on the template in `frontend/src/aws-exports-template.js` and populate with the values obtained deploying the CloudFormation template above.

In the `frontend` folder, run

```bash
npm install && npm start
```

to install all npm modules and start a local dev server.

localhost:3000 is opened, and you're prompted to sign in / create a user.
