import React, { useEffect, useState } from 'react';
import '../css/Product.css';
import CheckIcon  from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetailsApi } from '../api/services/productServices';
import { addItem } from '../reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
export const ProductDetailsPage = () => {

  const currentProductId = useSelector((state)=> state.product.currentProductId);
const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
const currentUser = useSelector(state => state.user.currentUser)
  useEffect(() => {
    if (currentProductId) {
      fetchProductDetailsApi(currentProductId)
        .then(response => setProduct(response.data))
      
        .catch(error => console.error('Failed to fetch product details', error));
    }
  }, [currentProductId, dispatch]);

  const handleNav =  () =>{
    navigate('/sign-in')
  }
  const handleAddToCart = () => {
   
      dispatch(addItem({...product, quantity: 1})); 
      setAddedToCart(true);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setTimeout(() => setAddedToCart(false), 3000);
  
    };
  
  

  if (!product) {
    return <div>Loading...</div>;
  }
  const formattedCategoryName = product.category.replace(/_/g, " ");
  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <div className="product-info">
        <img src={product.image} alt={product.name} />
        <div className="product-meta">
          <p><strong>Price:</strong> ${product.price}0</p>
          <p><strong>Category:</strong> {formattedCategoryName}</p>
        </div>
      </div>
      <button onClick={currentUser ? handleAddToCart : handleNav}   className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          disabled={addedToCart}> {addedToCart ? <CheckIcon /> : 'Add to Cart'}
          </button>
          {showSuccessMessage && <div className="success-message">Added to Cart!</div>}
    
    </div>
  );
};

export default ProductDetailsPage;
