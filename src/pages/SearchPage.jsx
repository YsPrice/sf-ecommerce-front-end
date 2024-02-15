import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductItem from '../components/ProductItem'; 
import '../css/ProductGrid.css';

export const SearchPage = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div>
      <h1>Search Results</h1>
      <div className="product-grid">
        {results.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
