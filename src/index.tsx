import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "src/styles/global";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <GlobalStyle />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
