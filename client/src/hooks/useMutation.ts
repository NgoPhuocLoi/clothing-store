import axios, { AxiosError, AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/store';

const useMutation = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const { setIsRefetching } = useContext(StoreContext);

  const mutate = (callback: Promise<AxiosResponse<any, any>>) => {
    setLoading(true);
    callback
      .then((res: AxiosResponse<any, any>) => {
        setData(res.data);
        if (setIsRefetching) {
          setIsRefetching((prev: boolean) => !prev);
        }
        toast.success('Success!');
      })
      .catch((err: Error | AxiosError<any, any>) => {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message);
        }
        toast.error('Error');
      })

      .finally(() => {
        setLoading(false);
      });
  };
  return { mutate, data, error, loading };
};

export default useMutation;
