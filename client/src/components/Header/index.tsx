import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterForm, ProductForm, SearchForm } from '../Forms';
import Modal from '../Modal';
import './Header.css';

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <p onClick={() => navigate('/')}>Home</p>
        <p onClick={() => setOpenAddProduct(true)}>Create Product</p>
        <p onClick={() => setOpenSearch(true)}>Search</p>
        <p onClick={() => setOpenFilter(true)}>Filter</p>
      </nav>

      {/* -------- Search --------- */}
      {openSearch && (
        <Modal title="Search" setOpen={setOpenSearch}>
          <SearchForm />
        </Modal>
      )}

      {/* -------- Filter --------- */}
      {openFilter && (
        <Modal title="Filter" setOpen={setOpenFilter}>
          <FilterForm />
        </Modal>
      )}
      {/* --------- Add Product Form----------- */}
      {openAddProduct && (
        <Modal title="Create product" setOpen={setOpenAddProduct}>
          <ProductForm btnTxt="hello" />
        </Modal>
      )}
    </header>
  );
};

export default Header;
