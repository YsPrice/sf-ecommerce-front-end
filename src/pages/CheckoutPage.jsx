import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrderFromCartApi } from '../api/services/userServices';
import '../css/CheckoutPage.css';
import { clearCart } from '../reducers/cartSlice';

export const CheckoutPage = () => {
 const cartItems = useSelector(state => state.cart.items);
 const [order,setOrder] = useState({});
 const [currentOrder, setCurrentOrder] = useState(false)
const currentUser = useSelector(state=> state.user.currentUser)
 const dispatch = useDispatch()
 const handleCreateOrder = async () => {
    const token = localStorage.getItem('token');
    if (token) {
 
        console.log("Retrieved token:", token);
      } else {
     
        console.log("No token found in local storage.");
      }
      const orderData = await createOrderFromCartApi(token)
      dispatch(clearCart())
      console.log('Order created:', orderData);
      setOrder(orderData)
      setCurrentOrder(true)
 }


 
    return (
        
        <div className="checkout-page">
         
            {currentOrder !== false  ? (<> 
            <h1>
                Order Details
            </h1>
            <h3>Order status: {order.order.status}</h3>
            <p>
            This project was built with Ruby on Rails and React.js
            I hope you enjoyed it!
            </p>

            </>) : (
                  <>
                {currentUser && cartItems.length > 0? (<>
                 
            <h1>Checkout</h1>
            <div className="checkout-container">
                <div className="shipping-details">
                    <h2>Shipping Details not necessary</h2>
           
                        <h3>
                            Thanks for making it this far! 
                        </h3>
                        <button className="order-btn"onClick={handleCreateOrder} >Place Order</button>
              
                </div>
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                   {cartItems.map(item => (
                       <div className="product">
                       <h3 className="item-name">{item.name}</h3>
                       <h3 className="item-quan">Quantity: {item.quantity}</h3>
                       <img className="chk-out-img" src={item.image} alt="image"/>
                       </div>
                   ))
                }
                </div>
            </div>
            </>)
             : (<h1> <Link to="/"> No Order to show! Return Home</Link></h1>)}
            </>
            )}
           
        </div>
    );
};

export default CheckoutPage;
