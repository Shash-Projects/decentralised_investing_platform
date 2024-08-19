// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Propose from'./components/Propose';
import CreateDao from './components/createDao';
import Invest from './components/Invest'; 
import App from './App';
import { AuthProvider } from './AuthContext';
import EngageDao from './components/EngageDao';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<>
          <App/>
          </>} />
          <Route path="/propose" element={<Propose />} />
          <Route path="/create-DAO" element={<CreateDao />} />
          <Route path="/engage-DAO" element={<EngageDao />} />
          <Route path="/invest" element={<Invest />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
