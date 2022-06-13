import React, { ReactNode } from 'react';
import './Modal.css';

interface Props {
  title: string;
  children: ReactNode;
  setOpen: (status: boolean) => void;
}

const Modal = ({ title, children, setOpen }: Props) => {
  return (
    <div className="modal">
      <div className="container">
        <h3>{title}</h3>
        {children}
        <span className="close" onClick={() => setOpen(false)}>
          &#10006;
        </span>
      </div>
    </div>
  );
};

export default Modal;
