import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Products from '../../components/Products';
import Sorting from '../../components/Sorting';
import { StoreContext } from '../../context/store';
import useInfinityQuery from '../../hooks/useInfinityQuery';
import { Product } from '../../interface';
import './Search.css';

const Search = () => {
  const { value } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [stop, setStop] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [limit, setLimit] = useState(2);

  const { sort } = useContext(StoreContext);

  const { BtnRender, data, error, loading } = useInfinityQuery({
    url: `/products?search=${value}&sort=${sort}&limit=${limit}`,
    depends: [value, sort],
    otp: {
      stop: stop,
      firstLoad: firstLoad,
    },
  });

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
  }, [value, sort]);

  return (
    <>
      <Sorting />
      <Products products={products} />
      {loading && <h2>Loading</h2>}
      {error && <h2>Error</h2>}
      {BtnRender()}
    </>
  );
};

export default Search;
