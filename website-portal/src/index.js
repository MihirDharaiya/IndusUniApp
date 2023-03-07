import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Paths from "./Paths.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
    <div className="backgroundimage">
      <Paths />
      </div>
    </BrowserRouter>
  </>
);
