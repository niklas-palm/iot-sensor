const env = require("process").env;
const fetch = require("node-fetch");
const URL = require("url");
const AWS = require("aws-sdk");

AWS.config.update({
  region: env.REGION,
  credentials: new AWS.Credentials(
    env.AWS_ACCESS_KEY_ID,
    env.AWS_SECRET_ACCESS_KEY,
    env.AWS_SESSION_TOKEN
  ),
});

exports.lambdaHandler = (event, context, callback) => {
  console.log(event);
  // Mutation to add a new sensor
  const AddSensor = `mutation AddSensor($SensorId: ID!, $sensorLocation: String!, $sensorValue: Int!) {
    addSensor(SensorId: $SensorId, sensorLocation: $sensorLocation, sensorValue: $sensorValue) {
        SensorId
        sensorLocation
        sensorValue
    }
  }`;

  // // Mutation to update an existing sensor's sensor value
  // const UpdateSensorValue = `mutation UpdateSensorValue($SensorId: ID!, $sensorValue: Int!) {
  //   updateSensorValue(SensorId: $SensorId, sensorValue: $sensorValue) {
  //       SensorId
  //       sensorValue
  //   }
  // }`;

  // Constructs variables details to send in the HTTP Post
  const details = {
    SensorId: event.SensorId,
    sensorLocation: event.sensorLocation,
    sensorValue: parseInt(event.sensorValue),
  };

  // Construct HTTP Post body
  const postBody = {
    query: AddSensor,
    operationName: "AddSensor",
    variables: details,
  };

  console.log(`Posting: ${JSON.stringify(postBody, null, 2)}`);

  // Create the HTTP request
  const uri = URL.parse(env.GRAPHQL_API);
  const httpRequest = new AWS.HttpRequest(uri.href, env.REGION);
  httpRequest.headers.host = uri.host;
  httpRequest.headers["Content-Type"] = "application/json";
  httpRequest.method = "POST";
  httpRequest.body = JSON.stringify(postBody);

  // Get AWS credentials and sign the httpRequest with those credentials.
  AWS.config.credentials.get((err) => {
    const signer = new AWS.Signers.V4(httpRequest, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const options = {
      method: httpRequest.method,
      body: httpRequest.body,
      headers: httpRequest.headers,
    };

    fetch(uri.href, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(`JSON Response = ${JSON.stringify(json, null, 2)}`);
        callback(null, event);
      })
      .catch((err) => {
        console.error(`FETCH ERROR: ${JSON.stringify(err, null, 2)}`);
        callback(err);
      });
  });
};
