import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App";
import { Provider } from "react-redux";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
