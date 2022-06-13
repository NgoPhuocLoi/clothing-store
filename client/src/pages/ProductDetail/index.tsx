import React from 'react';
import { useParams } from 'react-router-dom';
import ProductInfo from '../../components/ProductInfo';
import useQuery from '../../hooks/useQuery';
import { Product } from '../../interface';

const ProductDetail = () => {
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useQuery<Product>(`/products/${id}`);

  return (
    <div>
      {product && <ProductInfo product={product} />}
      {loading && <h2>Loading</h2>}
      {error && <h2>Error</h2>}
    </div>
  );
};

export default ProductDetail;
