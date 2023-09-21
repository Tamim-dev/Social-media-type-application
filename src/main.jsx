import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import firebaseConfig from "./firebaseConfig.js";
import "./index.css";
import { store } from "./components/app/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
