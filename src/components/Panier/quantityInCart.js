import React from 'react';
import {updateCart} from '../../redux/panier/actionPanier';
import {useDispatch} from 'react-redux';

const QuantityInCart = ({ product, onQuantityChange }) => {
  const dispatch = useDispatch()

  const handleIncrement = () => {
    onQuantityChange(product.id, product.quantity + 1);
    dispatch(updateCart({id: product.id, quantity: product.quantity + 1}));
  };

  const handleDecrement = () => {
    if (product.quantity > 0) {
      onQuantityChange(product.id, product.quantity - 1);
      dispatch(updateCart({id: product.id, quantity: product.quantity - 1}));
    }
  };

  return (
    <div className="action action-cart">
        <div className="mb-1">Nbre : <span style={{fontWeight: 'bold'}}>{product.quantity}</span></div>
        <div className="btn-action-wrapper mb-1">
          <button className="btn btn-action-min" onClick={handleDecrement}>-</button>
          <span>&nbsp;&nbsp;</span>
          <button className="btn btn-action-max" onClick={handleIncrement}>+</button>
        </div>
    </div>
  );
}

export default QuantityInCart
