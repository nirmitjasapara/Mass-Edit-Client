import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import { CustomProvider } from "./contexts/CustomContext";

ReactDOM.render(
  <BrowserRouter>
    <CustomProvider>
      <App />
    </CustomProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
