import { useCallback, useEffect, useRef, useState } from 'react';
import { DataResponse } from '../interface';
import useQuery from './useQuery';

const DEFAULT_OPTION = {
  stop: false,
  firstLoad: true,
};

interface Props {
  url: string;
  depends: Array<any>;
  otp?: {
    stop: boolean;
    firstLoad: boolean;
  };
}

const useInfinityQuery = ({ url, otp, depends = [] }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(1);

  const option = { ...DEFAULT_OPTION, ...otp };
  console.log(option);

  const query = useQuery<DataResponse>(`${url}&page=${page}`);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depends);

  const loadMore = useCallback(() => {
    if (option.stop) return;
    setPage((prev: number) => prev + 1);
  }, [option.stop]);

  useEffect(() => {
    const btn = btnRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !option.firstLoad) {
        loadMore();
      }
    });

    if (btn) observer.observe(btn);

    return () => {
      if (btn) observer.unobserve(btn);
    };
  }, [loadMore, option.firstLoad]);

  const BtnRender = () => {
    return (
      <button
        className="btn-load-more"
        onClick={loadMore}
        disabled={option.stop}
        ref={btnRef}
      >
        Load More
      </button>
    );
  };
  return { BtnRender, ...query };
};

export default useInfinityQuery;
