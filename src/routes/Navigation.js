import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Client/Home";
import { HomeAdmin } from "../pages/Admin/HomeAdmin";

export const Navigation = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin/*" element={<HomeAdmin />} />
        </Routes>
      </Router>
    </div>
  );
};
