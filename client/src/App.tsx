import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import { FilterPage, HomePage, ProductDetail, SearchPage } from './pages';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search/:value" element={<SearchPage />} />
        <Route path="/filter/:option/:value" element={<FilterPage />} />
      </Routes>
    </div>
  );
}

export default App;
