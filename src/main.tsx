import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.min.css";
import "react-datepicker/dist/react-datepicker.css";
import App from "./App";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
