import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Categories from './components/Categories/Categories';
import Details from './components/Details/Details';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import Searchpage from './components/Searchpage/Searchpage';
import Trending from './components/Trending/Trending';
import Cart from './components/Cart/Cart';
import PaymentPage from './components/Payment/Payment';
import AddItems from './components/AddItems/AddItems';

function App() {
  return (
   
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Menu />} /> 
        <Route path="/details" element={<Details />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} /> 
        <Route path="/add-items" element={<AddItems />} />
      </Routes>
  );
}

export default App;
