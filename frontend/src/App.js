import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/Homepage';
import './styles.css';  // Import your styles
import { UserProvider } from './context/userContext';
import ItemManager from './pages/Itemspage';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items" element={<ItemManager />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
