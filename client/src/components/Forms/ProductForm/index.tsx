import React, { ChangeEvent, FormEvent, useState } from 'react';
import { createProduct, updateProduct } from '../../../api/productAPI';
import useMutation from '../../../hooks/useMutation';
import { Product } from '../../../interface';
import './ProductForm.css';

interface Props {
  btnTxt: string;
  data?: Product;
}

const ProductForm: React.FC<Props> = ({ btnTxt, data }) => {
  const [productForm, setProductForm] = useState({
    title: data ? data.title : '',
    description: data ? data.description : '',
    price: data ? data.price : '',
    category: data ? data.category : '',
    image: data ? data.image : '',
  });

  const { mutate } = useMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (data) {
      // UPDATE
      const result = shallowEqual(productForm, data);

      if (result) return;
      mutate(updateProduct(data._id, productForm as Product));
    } else {
      // CREATE
      mutate(createProduct(productForm as Product));
    }
  };

  const shallowEqual = (obj1: object, obj2: object) => {
    const keys: string[] = Object.keys(obj1);

    for (let key of keys) {
      if ((obj1 as any)[key] !== (obj2 as any)[key]) return false;
    }
    return true;
  };
  return (
    <div className="product_form">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Product title"
          defaultValue={data?.title}
          required
        />

        <input
          onChange={handleChange}
          type="text"
          name="description"
          placeholder="Product description"
          defaultValue={data?.description}
          required
        />

        <input
          onChange={handleChange}
          type="number"
          name="price"
          placeholder="Product price"
          defaultValue={data?.price}
          required
        />

        <input
          onChange={handleChange}
          type="text"
          name="category"
          placeholder="Product category"
          defaultValue={data?.category}
          required
        />

        <input
          onChange={handleChange}
          type="text"
          name="image"
          placeholder="Product image"
          defaultValue={data?.image}
          required
        />

        <button>{btnTxt}</button>
      </form>
    </div>
  );
};

export default ProductForm;
