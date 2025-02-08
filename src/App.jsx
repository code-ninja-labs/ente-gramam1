import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Home Component
import Autorickshaw from './pages/Autorickshaw'; // Existing Autorickshaw Component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Autorickshaw Services */}
        <Route path="/autorickshaw" element={<Autorickshaw />} />
    </Router>
  );
}

export default App;
