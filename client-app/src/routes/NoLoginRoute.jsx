import React from "react";
import { Route, Routes } from "react-router";
import CallbackPage from "../pages/Callback/CallbackPage";
import HomePage from "../pages/Home/HomePage";

function NoLoginRoute() {
  return (
    <Routes>
      <Route path="/callback" element={<HomePage />} />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
}

export default NoLoginRoute;
