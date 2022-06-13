import { useContext, useMemo } from 'react';
import { StoreContext } from '../context/store';
import useCustomRouter from './useCustomRouter';

const usePagination = (totalPages: number) => {
  const { pushQuery } = useCustomRouter();
  const { page, sort } = useContext(StoreContext);

  const { firstArr, lastArr } = useMemo<{
    firstArr: number[];
    lastArr: number[];
  }>(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1);

    if (totalPages <= 4) return { firstArr: newArr, lastArr: [] };

    if (totalPages - page! >= 4) {
      return {
        firstArr: newArr.slice(page! - 1, page! + 2),
        lastArr: newArr.slice(totalPages - 1),
      };
    } else {
      return {
        firstArr: newArr.slice(totalPages - 4, totalPages),
        lastArr: [],
      };
    }
  }, [totalPages, page]);

  const isActive = (index: number) => {
    return index === page ? 'active' : '';
  };

  const next = () => {
    if (page === totalPages) return;
    pushQuery({ page, sort });
  };
  const prev = () => {
    if (page === 1) return;
    pushQuery({ page, sort });
  };

  const jump = (num: number) => {
    pushQuery({ page: num, sort });
  };
  return { firstArr, lastArr, next, prev, jump, isActive };
};

export default usePagination;
