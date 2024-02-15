import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem, updateItemQuantity } from '../reducers/cartSlice'; 
import '../css/ProductItem.css'
import { setCurrentProductId} from '../reducers/productSlice';
import CheckIcon  from '@mui/icons-material/Check';
import { useState } from 'react';
import { addToCartApi } from '../api/services/userServices';


export const ProductItem = ({product}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCartId = useSelector(state => state.user.cartId?.id)
  const cartItems = useSelector(state => state.cart.items);
  const currentUser = useSelector(state=> state.user.currentUser);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const goToProduct = (id) => {
    dispatch(setCurrentProductId(product.id));
    navigate(`/product/${id}`)
   }
   
   const handleAddToCart = async () => {  
    const quantity = 1
    try{
      const existingCartItem = cartItems.find(item => item.id === product.id);
      if (existingCartItem) {
   
      const newQuantity = existingCartItem.quantity + quantity;
      dispatch(updateItemQuantity({ id: product.id, quantity: newQuantity }));
    } else {
        const response = await addToCartApi(currentCartId, product.id, quantity);
        const { cart_item } = response.data;
        dispatch(addItem({ product, quantity, cartItemId: cart_item.id }));
    }
      setAddedToCart(true);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setTimeout(() => setAddedToCart(false), 3000);
  
    }catch(error){
      console.error(error)
    }


  };

const handleNav =  () =>{
  navigate('/sign-in')
}
  return (
    <div className="product-item">
      <img onClick={() => goToProduct(product.id)} src={product.image} alt={product.name} className="product-image" />
      <div className="product-info-wrapper">
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price}0</p>
        <button onClick={currentUser ? handleAddToCart : handleNav}   className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          disabled={addedToCart}> {addedToCart ? <CheckIcon /> : 'Add to Cart'}
          </button>
          {showSuccessMessage}
      </div>
      </div>
    </div>
  );
};

export default ProductItem;