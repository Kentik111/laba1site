import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import ProductForm from './pages/ProductForm';
import UserForm from './pages/UserForm';
import UserDetail from './pages/UserDetail';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<UserForm />} /> 
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/user/:id" element={<UserDetail />} /> 
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
