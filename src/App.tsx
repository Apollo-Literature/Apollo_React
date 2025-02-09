import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Loginpage'; // Ensure the path is correct

const App: React.FC = () => {
  const handleLoginSuccess = () => {
    console.log("Login successful!");
    // You can add navigation or other logic here after login success.
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onSuccess={handleLoginSuccess} />}
        />
        {/* You can add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
