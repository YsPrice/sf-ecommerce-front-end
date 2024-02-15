import React, { useState, useRef } from 'react';
import '../css/./Navbar.css';
import '../css/./CartSubMenu.css';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../reducers/userSlice';
import { updateItemQuantity, removeItem, clearCart } from '../reducers/cartSlice';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import {CartIconComp} from './CartIcon';
import { removeCartItemApi, updateCartItemApi } from '../api/services/userServices';

export const Navbar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector(state => state.cart.items);
  const cartId = useSelector(state=> state.user.cartId?.id);
  const submenuRef = useRef();
  const navbarRef = useRef(null);
  const imgUrl = "https://res.cloudinary.com/ducg1tnoi/image/upload/v1708014233/pngaaa.com-1989286_urg0e6.png";

const goToCheckout = () => {
  navigate('/checkout'); 
  setIsOpen(!isOpen);
};

const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(resetUser());
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setShowSubMenu(false);
    }
};

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };

    
   
}, []);


  useEffect(() => {
  function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
          setIsOpen(false); 
      }
  }
  document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
}, [navbarRef]);

const handleIncrementQuantity = async (productId) => {
const cartItem = cartItems.find(item => item.id === productId);
if(cartItem){
  const newQuantity = cartItem.quantity + 1;

try{
  await updateCartItemApi(cartId,cartItem.cartItemId,newQuantity)
  dispatch(updateItemQuantity({ id: productId, quantity: newQuantity }));
}catch(error){
  console.error(error)
}
}
}
const handleDecrementQuantity = async (productId) => {
  const cartItem = cartItems.find(item => item.id === productId);

  if (cartItem && cartItem.quantity > 1) {
    const newQuantity = cartItem.quantity - 1;
    try {
      await updateCartItemApi(cartId, cartItem.cartItemId, newQuantity);
      dispatch(updateItemQuantity({ id: productId, quantity: newQuantity }));
    } 
    
    catch (error) {
      console.error("Error updating item quantity:", error);
    }
  }
};


  const handleRemove = async (id) => {
    const cartItem = cartItems?.find(item => item.id === id);
    if (!cartItem) {
      console.error("Item not found in cart");
      return;
    }
    const cartItemId = cartItem?.cartItemId;
  
    try {
      const response = await removeCartItemApi(cartId, cartItemId);
      console.log(response.data);
      dispatch(removeItem(id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
 

  return (
    <>
      <nav className="navbar" >
      <span className="navbar-toggle" id="js-navbar-toggle" onClick={toggleNavbar} >
        ☰
      </span>
      <Link to="/" className="logo"><img className="navbar-logo"src={imgUrl} alt="Logo"/></Link>
      <ul ref={navbarRef} className={`main-nav ${isOpen ? 'active' : ''}`} id="js-menu">
        <li>
          <Link onClick={() => setIsOpen(!isOpen)} to="/" className="nav-links">Home</Link>
        </li>
        <li>
          <Link onClick={() => setIsOpen(!isOpen)} to="/about" className="nav-links">About</Link>
        </li>
        <li>
          <Link onClick={() => setIsOpen(!isOpen)} to="/categories" className="nav-links">Categories</Link>
        </li>
        {currentUser ? (
          <>    
      <li className="nav-links">
        {currentUser.uid}
      </li>
      <li className="nav-links" >
        <div onClick={() => setShowSubMenu(!showSubMenu)} >
      {<CartIconComp />}
      </div>
      </li>
      {showSubMenu && (
        <div className="cart-submenu" >
                   <div className="submenu" ref={submenuRef}>
                   {cartItems?.map(item => (
                       <div key={item?.id} className="cart-item">
                           <img src={item?.image} alt={item?.name} className="cart-item-image" />
                           <div className="cart-item-details">
                               <h4>{item?.name}</h4>
                               <div className="qual-cont">
                               <button onClick={() => handleIncrementQuantity(item?.id)} className="quantity-controls">+</button>
                               <div className="quant-num">{item?.quantity}</div>
                               <button onClick={() => handleDecrementQuantity(item?.id)} className="quantity-controls">-</button>
                               <button onClick={() => handleRemove(item?.id)} className="remove-item">Remove</button>
                               <p className="price">${item?.price * item?.quantity}</p>
                               </div>
                           </div>
               
                       </div>
                   ))}  
                   {cartItems.length !== 0 ? (
                             <button className="checkout-btn" onClick={goToCheckout}>Go to Checkout</button> ): (<p className="cart-item-details">Your cart is empty.</p>)}
               </div>
               </div>
            )}

      <button className="sign-out"onClick={handleSignOut}>
          Sign Out
            </button>
      </>
        ) : (  <li>
          <Link onClick={() => setIsOpen(!isOpen)} to="/sign-up" className="nav-links">Sign up</Link>
        </li>
     )}
      </ul>
    </nav>
    <SearchBar/>
    </>
  );
};

export default Navbar;
