import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

import "antd/dist/reset.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./redux/store/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
