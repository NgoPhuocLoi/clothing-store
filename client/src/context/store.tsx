import { createContext, ReactNode, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Query } from '../interface';

const initialValue = {
  page: 1,
  sort: '-createdAt',
};

export const StoreContext = createContext<Query>(initialValue);

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { search } = useLocation();
  const caches = useRef({});
  const [isRefetching, setIsRefetching] = useState(false);

  const { page, sort } = useMemo(() => {
    const page = new URLSearchParams(search).get('page') || 1;
    const sort = new URLSearchParams(search).get('sort') || '-createdAt';
    return { page: +page, sort };
  }, [search]);

  const value = {
    page,
    sort,
    caches: caches.current,
    isRefetching,
    setIsRefetching,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
