import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Auth/Signin"; // Import the SigninPage
import SignupPage from "./pages/Auth/Signup"; // Import the SignupPage
import ForgotPassword from "./pages/Auth/FrogotPassword";
import Home from "./pages/Role/PorR"; // Import the Home page

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        {/* Add signin route */}
        <Route path="/signup" element={<SignupPage />} />{" "}
        {/* Add signup route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        {/* Add frogotpassword route */}
        <Route path="/home" element={<Home />} /> {/* Add home route */}
      </Routes>
    </Router>
  );
};

export default App;
