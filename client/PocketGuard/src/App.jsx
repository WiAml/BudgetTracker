import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getTransactions } from './services/api';
import Dashboard from './pages/Dashboard';
import './App.css';
const About = () => (
  <div className="container card">
    <h2>About Pocket Guard</h2>
    <p>A simple way to keep track of spending habits[cite: 11].</p>
  </div>
);
function App() {
  const [transactions, setTransactions] = useState([]);
  const loadData = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error("Backend connection failed", err);
    }
  };
  useEffect(() => { loadData(); }, []);
  return (
    <Router>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="nav-logo">Pocket Guard</Link>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard transactions={transactions} onUpdate={loadData} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
export default App;