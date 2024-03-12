import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import {AuthContextProvider} from "./contexts/AuthContext";
import SettingsContextProvider from "./contexts/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
    <SettingsContextProvider>
      <App />
    </SettingsContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
