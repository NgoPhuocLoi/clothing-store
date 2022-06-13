import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Products from '../../components/Products';
import useInfinityQuery from '../../hooks/useInfinityQuery';
import useQuery from '../../hooks/useQuery';
import { DataResponse, Product } from '../../interface';

const Filter = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { value, option } = useParams();
  const [stop, setStop] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [limit, setLimit] = useState(2);

  const { BtnRender, data, error, loading } = useInfinityQuery(
    // `/products?price[${option}]=${value}`,
    {
      url: `/products?price[${option}]=${value}&limit=${limit}`,
      depends: [value, option],
      otp: {
        stop,
        firstLoad,
      },
    },
  );

  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data?.products]);
      setFirstLoad(false);
      if (data?.products.length === 0) {
        toast.error('Product not found');
      }
      if (data?.products.length < limit) {
        setStop(true);
      }
    }
  }, [data?.products, limit]);

  useEffect(() => {
    setProducts([]);
    setStop(false);
  }, [value]);

  return (
    <>
      <Products products={products} />
      {loading && <h2>Loading</h2>}
      {error && <h2>Error</h2>}
      {BtnRender()}
    </>
  );
};

export default Filter;
