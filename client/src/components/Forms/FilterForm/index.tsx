import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FilterForm.css';

const FilterForm = () => {
  const [filterForm, setFilterForm] = useState({
    value: '',
    option: 'lt',
  });
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilterForm({ ...filterForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return navigate(`/filter/${filterForm.option}/${filterForm.value}`);
  };
  return (
    <div className="filter_form" title="Enter to filter">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="value"
            onChange={handleChange}
            type="text"
            placeholder="0"
            required
          />

          <select name="option" onChange={handleChange}>
            <option value="lt" title="lesser than">
              LT
            </option>
            <option value="lte" title="lesser than or equal">
              LTE
            </option>
            <option value="gt" title="greater than">
              GT
            </option>
            <option value="gte" title="greater than or equal">
              GTE
            </option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FilterForm;
