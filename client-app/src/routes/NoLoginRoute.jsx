import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/Home/HomePage";

function NoLoginRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default NoLoginRoute;
