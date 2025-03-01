import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Editor from "./pages/EditorPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
