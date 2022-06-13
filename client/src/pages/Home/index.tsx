import { useContext, useEffect, useMemo, useState } from 'react';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';
import Sorting from '../../components/Sorting';
import { StoreContext } from '../../context/store';
import useQuery from '../../hooks/useQuery';
import { DataResponse, Product } from '../../interface';

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(5);
  const { page, sort } = useContext(StoreContext);

  const { data, loading, error } = useQuery<DataResponse>(
    `/products?limit=${limit}&page=${page}&sort=${sort}`,
    { saveCache: true },
  );

  useEffect(() => {
    if (data) setProducts(data.products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.products]);

  const totalPages = useMemo(() => {
    if (!data?.count) return 0;
    return Math.ceil(data?.count / limit);
  }, [data?.count, limit]);

  return (
    <div>
      <Sorting page={page} />
      <Products products={products} />
      {loading && <h2>Loading</h2>}
      {error && <h2>Error</h2>}
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Home;
