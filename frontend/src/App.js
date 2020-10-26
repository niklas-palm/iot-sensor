import React from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import "./App.scss";
import "@aws-amplify/ui/dist/style.css"; // Styles for login component
import { withAuthenticator } from "aws-amplify-react";

// GraphQL
import { allSensors } from "./graphql/queries";
import { onAddSensor } from "./graphql/subscriptions";

// Components
import { SensorCard } from "./sensorCard";

Amplify.configure(awsconfig);

function App() {
  const [sensors, setSensors] = React.useState({}); // Observeable that holds all sensors

  // Triggered once component mounts.
  React.useEffect(() => {
    // Fetch all sensors
    const getData = async () => {
      const res = await API.graphql(graphqlOperation(allSensors));
      let init_sensors = {};
      res.data.allSensors.sensors.forEach((sensor) => {
        init_sensors[sensor.SensorId] = sensor;
      });
      setSensors(init_sensors);
      return;
    };

    // Subscribe to sensor changes
    const subToChanges = () => {
      let subscription = API.graphql(graphqlOperation(onAddSensor)).subscribe({
        next: (payload) => {
          // console.log(payload.value.data.onAddSensor);
          let newSensor = payload.value.data.onAddSensor;
          // Do something with the data
          console.log(newSensor);
          setSensors((prev) => ({
            ...prev,
            [newSensor.SensorId]: newSensor,
          }));
        },
      });
      return subscription;
    };

    getData();
    const subscription = subToChanges();

    return () => {
      // unsubscribe to changes once components unmounts.
      subscription.unsubscribe();
    };
  }, []);

  const renderSensors = () => {
    // Map over each sensor and return a SensorCard for each
    if (Object.keys(sensors).length > 0) {
      return Object.values(sensors).map((sensor) => {
        return <SensorCard key={sensor.SensorId} sensor={sensor} />;
      });
    }
    return <h2 style={{ color: "#d45b07", fontWeight: "400" }}>Loading...</h2>;
  };

  // If sensors comes back empty.
  return (
    <div className="AppWrapper">
      <div className="App">{renderSensors()}</div>
    </div>
  );
}

export default withAuthenticator(App, {
  usernameAttributes: "email",
  includeGreetings: true, // This adds the header, letting you sign out.
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
});
