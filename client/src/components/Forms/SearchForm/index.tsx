import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    return navigate(`/search/${searchValue}`);
  };
  return (
    <div className="search_form">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
