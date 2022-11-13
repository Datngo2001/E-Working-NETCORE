import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/Home/HomePage';
import ProfilePage from '../pages/Profile/ProfilePage';
import RegisterPage from '../pages/Register/RegisterPage';
import LoginPage from '../pages/Login/LoginPage';

function LandingPageRoute() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
    </Routes>
  );
}

export default LandingPageRoute;
