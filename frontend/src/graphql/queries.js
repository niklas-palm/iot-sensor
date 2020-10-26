export const getSensor = /* GraphQL */ `
  query GetSensor($id: ID!) {
    getSensor(SensorId: $id) {
      SensorId
      sensorLocation
      sensorValue
    }
  }
`;

export const allSensors = /* GraphQL */ `
  query AllSensors($limit: Int, $nextToken: String) {
    allSensors(limit: $limit, nextToken: $nextToken) {
      sensors {
        SensorId
        sensorLocation
        sensorValue
      }
      nextToken
    }
  }
`;
