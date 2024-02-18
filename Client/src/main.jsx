import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import ThemeProvider from "./Components/ThemeProvider.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider>
    <BrowserRouter>
    <ScrollToTop />
      <App />
    </BrowserRouter>
    </ThemeProvider>
  </Provider>
  </PersistGate>
);
