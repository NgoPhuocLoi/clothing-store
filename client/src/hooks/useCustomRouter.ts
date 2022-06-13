import { useLocation, useNavigate } from 'react-router-dom';
import { Query } from '../interface';

const useCustomRouter = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pushQuery = (query: Query) => {
    const queryString = query.page
      ? `${pathname}?page=${query.page}&sort=${query.sort}`
      : `${pathname}?sort=${query.sort}`;
    navigate(queryString);
  };
  return { pushQuery };
};

export default useCustomRouter;
