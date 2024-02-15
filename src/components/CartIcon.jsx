import React from 'react';
import {ReactComponent as CartIcon} from '../../src/shopping-cart-svg.svg';
import { useSelector } from 'react-redux';
import '../css/CartIcon.css';
export const CartIconComp = () => {
    const totalItems = useSelector(state => state.cart?.items)

    return (
      <div className="cart-icon">
        <CartIcon />
        {totalItems.length > 0 && <span className="item-count">{totalItems.length}</span>}
      </div>
    );
  };
  
  export default CartIcon;