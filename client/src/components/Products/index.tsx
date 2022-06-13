import React, { useRef } from 'react';
import { Product } from '../../interface';
import ProductCard from './components/ProductCard';
import './Products.css';

const Products: React.FC<{ products: Product[] }> = ({ products }) => {
  const ref = useRef(0);
  return (
    <div className="products">
      <h1>Render : {ref.current++}</h1>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default React.memo(Products);
