import React, { useContext } from 'react';
import { StoreContext } from '../../context/store';
import useCustomRouter from '../../hooks/useCustomRouter';
import './Sorting.css';

interface Props {
  page?: number;
}

const Sorting: React.FC<Props> = ({ page }) => {
  const { pushQuery } = useCustomRouter();
  const { sort } = useContext(StoreContext);

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    pushQuery({ page, sort: value });
  };
  return (
    <div className="sorting">
      <select onChange={handleSort} value={sort}>
        <option value="-createdAt">Newest</option>
        <option value="createdAt">Oldest</option>
        <option value="-price">Price: Hight-Low</option>
        <option value="price">Price: Low-Hight</option>
      </select>
      <h2>&#8678;Sort</h2>
    </div>
  );
};

export default React.memo(Sorting);
