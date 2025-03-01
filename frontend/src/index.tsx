import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import EditPost from "./pages/EditPostPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/edit-post" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
