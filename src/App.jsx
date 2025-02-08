import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Autorickshaw from './pages/Autorickshaw'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Autorickshaw Route */}
        <Route path="/autorickshaw" element={<Autorickshaw />} />
      </Routes>
    </Router>
  );
}

export default App;
