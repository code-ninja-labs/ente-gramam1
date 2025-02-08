import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Home Component
import Autorickshaw from './pages/Autorickshaw'; // Existing Autorickshaw Component
import AutorickshawDrivers from './pages/AutorickshawDrivers'; // New Component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Autorickshaw Services */}
        <Route path="/autorickshaw" element={<Autorickshaw />} />

        {/* Autorickshaw Drivers Route */}
        <Route path="/autorickshaw-drivers" element={<AutorickshawDrivers />} />
      </Routes>
    </Router>
  );
}

export default App;
