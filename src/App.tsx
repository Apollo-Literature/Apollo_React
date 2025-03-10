import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SigninPage from "./pages/Auth/Signin"; // Import the SigninPage
import SignupPage from "./pages/Auth/Signup"; // Import the SignupPage
import ForgotPassword from "./pages/Auth/FrogotPassword";
import Home from "./pages/Role/PorR"; // Import the Home page
import PublisherDashboard from "./pages/Publisher/dashboard"; // Import the PublisherDashboard
<<<<<<< HEAD
import ReaderDashboard from "./pages/Reader/dashboard"; // Import the ReaderDashboard page
import LibraryBooks from "./components/reader/LibraryBook";
=======
import ReaderDashboard from "./pages/Reader/dashboard"; // Import the ReaderDashboard page";
import Library from "./pages/Library/dashboard"; // Import the Library;
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Add route */}
        <Route path="/" element={<SigninPage />} />
<<<<<<< HEAD
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
        <Route path="/reader/dashboard" element={<ReaderDashboard />} />
        <Route path="/reader/library/dashboard" element={<LibraryBooks />} />
=======
        <Route path="/signup" element={<SignupPage />} />{" "}
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route path="/home" element={<Home />} />
        <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
        <Route path="/reader/dashboard" element={<ReaderDashboard />} />
        <Route path="/Library/dashboard" element={<Library/>} />
>>>>>>> 6c975db697c71bd724e2e7c1f02bab8cd6958bd1
      </Routes>
    </Router>
  );
};

export default App;
