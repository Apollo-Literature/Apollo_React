import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/signpage/Signin'; // Import the SigninPage
import SignupPage from './pages/signpage/Signup'; // Import the SignupPage
import ForgotPassword from './pages/signpage/FrogotPassword';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />{/* Add signin route */}
        <Route path="/signup" element={<SignupPage />} /> {/* Add signup route */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add frogotpassword route */}
      </Routes>
    </Router>
  );
}

export default App;
