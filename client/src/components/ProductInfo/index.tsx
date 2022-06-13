import React from 'react';
import { Product } from '../../interface';
import './ProductInfo.css';

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product_info">
      <img src={product.image} alt="" />
      <div className="box">
        <h2>{product.title}</h2>
        <h3>{product.price}</h3>
        <p>{product.description}</p>
        <h4>Category: {product.category}</h4>
        <button>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductInfo;
