import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import AppRoutes from './AppRoutes';
import Footer from './Footer'; // Import the Footer component
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <AppRoutes />
      </div>
      <Footer /> {/* Add the Footer component here */}
    </Router>
  );
};

export default App;

