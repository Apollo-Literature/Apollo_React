import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Auth/Signin";
import SignupPage from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/FrogotPassword";
import Home from "./pages/Role/PorR";
import PublisherDashboard from "./pages/Publisher/dashboard";
import ReaderDashboard from "./pages/Reader/dashboard";
import Library from "./pages/Library/dashboard";
import Explore from "./pages/Explore/dashboard";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
        <Route path="/reader/dashboard" element={<ReaderDashboard />} />
        <Route path="/library/dashboard" element={<Library />} />
        <Route path="/explore/dashboard" element={<Explore />} />
      </Routes>
    </Router>
  );
};

export default App;
