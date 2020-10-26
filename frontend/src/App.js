import React from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import logo from "./logo.svg";
import "./App.scss";
import "@aws-amplify/ui/dist/style.css"; // Styles for login component

import { withAuthenticator } from "aws-amplify-react";

import { allSensors } from "./graphql/queries";
import { onAddSensor } from "./graphql/subscriptions";

Amplify.configure(awsconfig);

function App() {
  const [sensors, setSensors] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      const res = await API.graphql(graphqlOperation(allSensors));
      let init_sensors = {};
      res.data.allSensors.sensors.forEach((sensor) => {
        init_sensors[sensor.SensorId] = sensor;
      });
      setSensors(init_sensors);
      return;
    };

    const subToChanges = () => {
      const subscription = API.graphql(graphqlOperation(onAddSensor)).subscribe(
        {
          next: (payload) => {
            // console.log(payload.value.data.onAddSensor);
            let newSensor = payload.value.data.onAddSensor;
            // Do something with the data
            setSensors((prev) => ({
              ...prev,
              [newSensor.SensorId]: newSensor,
            }));
          },
        }
      );
    };

    getData();
    subToChanges();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
