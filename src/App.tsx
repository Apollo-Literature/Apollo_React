import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Auth/Signin";
import SignupPage from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/FrogotPassword";
import Home from "./pages/Role/PorR";
import PublisherDashboard from "./pages/Publisher/dashboard";
import ReaderDashboard from "./pages/Reader/dashboard";
import Library from "./pages/Reader/Library/dashboard";
import Explore from "./pages/Reader/Explore/dashboard";
import AboutUs from "./pages/aboutus/dashboard";
import Profile from "./components/other/Profile";

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
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/other/profile" element={<Profile/>}/>
        <Route
            path="*"
            element={
              <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h1 style={{ fontSize: "2.5rem", color: "#555" }}>🚧 Page Under Construction</h1>
                <p style={{ fontSize: "1.2rem", color: "#777" }}>
                  This page is not available yet. <br /> We are working hard to bring it to you soon!
                </p>
              </div>
            }
          />

      </Routes>
    </Router>
  );
};

export default App;
