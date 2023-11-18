import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import MenuPage from './MenuPage';
import NotFound from './NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/menu/" element={<MenuPage />} />
        <Route  path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;