import React, { useState, useEffect } from 'react';
import { fetchProductsByPage } from '../api/services/productServices';
import ProductItem from '../components/ProductItem';
import '../css/ProductGrid.css';
import { useDispatch } from 'react-redux';
import { clearCart } from '../reducers/cartSlice.js';
export const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  let totalPages = 3;
  useEffect(() => {
    fetchProductsByPage(currentPage)
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
 
 };

//  const dispatch = useDispatch();
//  dispatch(clearCart())
  return (
    <div>
      <h1 className="prod-h">Products</h1>
      <>
      <div className="product-grid">
        {products.map(product => (
      
          <ProductItem key={product.id} product={product}/>
        
        ))}
        </div>
        </>
  
        <div className="pagination-container">
  <button className="pagination-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
    Previous
  </button>
  <p className="current-page">{currentPage}</p>
  <button className="pagination-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
    Next
  </button>
</div>

    </div>
  );
};

export default ProductsPage;
