import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ListReplay from "./pages/ListReplay";
import Replay from "./pages/Replay";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="game" element={<App />} />
      <Route path="replay" element={<ListReplay />} />
      <Route path="replay/:id" element={<Replay />} />
    </Routes>
  </BrowserRouter>
);
