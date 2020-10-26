export const onAddSensor = /* GraphQL */ `
  subscription OnAddSensor {
    onAddSensor {
      SensorId
      sensorValue
      sensorLocation
    }
  }
`;

// Todo: Add createdAt and updated at..?
// export const onAddSensor = /* GraphQL */ `
//   subscription OnAddSensor {
//     onAddSensor {
//       SensorId
//       sensorValue
//       sensorLocation
//       createdAt
//       updatedAt
//     }
//   }
// `;
