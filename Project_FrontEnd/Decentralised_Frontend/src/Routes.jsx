// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProposerInvestorCards from './Cards';
import Propose from './Propose';
import Invest from './Invest'; 
import Navbar from './Navbar'
import Hero from './Hero';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<>
        <Navbar />
        <Hero />
        <ProposerInvestorCards />
        </>} />
        <Route path="/propose" element={<Propose />} />
        <Route path="/invest" element={<Invest />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
