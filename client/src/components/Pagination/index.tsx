import React, { useRef } from 'react';
import usePagination from '../../hooks/usePagination';
import './Pagination.css';

interface Props {
  totalPages: number;
}

const Pagination = ({ totalPages }: Props) => {
  const { firstArr, lastArr, isActive, prev, next, jump } =
    usePagination(totalPages);
  const ref = useRef(0);

  return (
    <div className="pagination">
      <h1>Render : {ref.current++}</h1>
      <button onClick={prev}>&laquo;</button>
      {firstArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}
      {lastArr.length > 0 && <button>...</button>}
      {lastArr.map((num) => (
        <button
          key={num}
          className={`${isActive(num)}`}
          onClick={() => jump(num)}
        >
          {num}
        </button>
      ))}
      <button onClick={next}>&raquo;</button>
    </div>
  );
};

export default React.memo(Pagination);
