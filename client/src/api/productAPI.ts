import axios from 'axios';
import { Product } from '../interface';

export const createProduct = async (newProduct: Product) => {
  return axios.post('/products', newProduct);
};

export const updateProduct = async (id: string, updateProduct: Product) => {
  return axios.put(`/products/${id}`, updateProduct);
};

export const deleteProduct = async (id: string) => {
  return axios.delete(`/products/${id}`);
};
