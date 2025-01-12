import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ImageProvider } from "./context/ImageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ImageProvider>
    <BrowserRouter>
      <App />
      <Toaster></Toaster>
    </BrowserRouter>
  </ImageProvider>
);
