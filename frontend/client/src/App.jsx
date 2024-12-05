import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(false); // Set loading state

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      setIsFirstTime(true);
      setLoading(true); // Set loading to true when it's the first visit
    }
  }, []);

  useEffect(() => {
    if (loading) {
      // Simulate loading delay before navigating to home page
      setTimeout(() => {
        setLoading(false); // Hide loading
      }, 2000); // Set timeout to show loading for 2 seconds
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          {isFirstTime ? (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/search" element={<Searchpage />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/add-items" element={<AddItems />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
