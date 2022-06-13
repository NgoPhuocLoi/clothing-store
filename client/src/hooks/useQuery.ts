import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/store';
import { initialState, reducer } from '../context/reducer/queryReducer';

const DEFAULT_OPTION = {
  sizeCache: 100,
  saveCache: false,
  refetchInterval: 500,
};

const useQuery = <T>(url: string, option?: object) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  let { caches, isRefetching } = useContext(StoreContext);

  const otp = { ...DEFAULT_OPTION, ...option };

  const clearCaches = () => {
    if (Object.keys(caches).length > 3) {
      caches = {};
    }
  };

  useEffect(() => {
    let isUnmount = false;
    const delayDebounce = setTimeout(
      async () => {
        if (caches[url]) {
          setData(caches[url]);
        }
        if (!caches[url]) setLoading(true);
        if (isUnmount) return;
        try {
          const res = await axios.get(url);
          setData(res.data);
          if (otp.saveCache) caches[url] = res.data;
          setLoading(false);
        } catch (error: any) {
          setError(error.response.data.message);
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      caches[url] ? otp.refetchInterval : 0,
    );
    clearCaches();

    return () => {
      isUnmount = true;
      clearTimeout(delayDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, isRefetching]);
  return { data, loading, error };
};

export default useQuery;
