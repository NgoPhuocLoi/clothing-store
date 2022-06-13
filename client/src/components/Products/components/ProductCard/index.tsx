import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../../../api/productAPI';
import useMutation from '../../../../hooks/useMutation';
import { Product } from '../../../../interface';
import { ProductForm } from '../../../Forms';
import LazyLoadImg from '../../../LazyLoadImg';
import Modal from '../../../Modal';
import './ProductCard.css';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const { mutate } = useMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm('Do you want delete?')) {
      mutate(deleteProduct(id));
    }
  };

  return (
    <>
      <div className="card">
        <LazyLoadImg url={product.image} />
        <div className="box">
          <h3>
            <Link to={`/products/${product._id}`}>
              <span />
              {product.title}
            </Link>
          </h3>

          <h4>{product.price}</h4>

          <div className="btn_div">
            <button
              className="btn_edit"
              onClick={() => setOpenUpdateForm(true)}
            >
              Edit
            </button>

            <button
              className="btn_delete"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Update form modal */}
      {openUpdateForm && (
        <Modal title="Update product" setOpen={setOpenUpdateForm}>
          <ProductForm btnTxt="Update" data={product} />
        </Modal>
      )}
    </>
  );
};

export default ProductCard;
