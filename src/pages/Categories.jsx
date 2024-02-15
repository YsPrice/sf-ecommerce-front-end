import React from 'react';
import '../css/Categories.css'
import { searchByCategoryApi } from '../api/services/productServices';
import { useState } from 'react';
import ProductItem from '../components/ProductItem';

export const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null)
  const categories = [
    { id: 1, name: "STREET FIGHTER 3", imageUrl: "https://res.cloudinary.com/ducg1tnoi/image/upload/v1708005170/latest_pfworz.png" },
    { id: 2, name: "STREET FIGHTER 2", imageUrl: "https://res.cloudinary.com/ducg1tnoi/image/upload/v1708005248/SF2__E3_82_BF_E3_82_A4_E3_83_88_E3_83_AB_E7_94_BB_E5_83_8F_x9oayf.jpg" },
    { id: 3, name: "STREET FIGHTER ALPHA", imageUrl: "https://res.cloudinary.com/ducg1tnoi/image/upload/v1708005293/street_fighter_alpha_arcade_flyer_m8mbt4.jpg" }
  ];


  const searchByCategory = (category) => {
    const formattedCategoryName = category.name.replace(/ /g, "_");
    setSelectedCategory(category.name);
    searchByCategoryApi(formattedCategoryName).then(res=>{
      setProducts(res.data)
    }).catch(error => {
      console.error('Error:',error)
    });

  }
 
  const resetCategories = () => {
    setSelectedCategory(null);
    setProducts([]);
  };

  return (
 
    <div className="categories-page">
         { selectedCategory && (
           
           <>
                   <button className="cat-btn"onClick={resetCategories}>Back to Categories</button>
  <h1>STREET FIGHTERS in {selectedCategory}</h1>
<div className="product-grid">
  {products.map(product => (

    <ProductItem key={product.id} product={product}/>
  
  ))}
  </div>
  <button className="cat-btn" onClick={resetCategories}>Back to Categories</button>
                 </>
                       )}
                       {!selectedCategory &&(
                       <>
      <h1>Shop by Category</h1>
      <div className="categories-container">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <img onClick={()=> searchByCategory(category)} src={category.imageUrl} alt={category.name} />
            <div className="category-name">{category.name}</div>
          </div>
    
        ))}
      </div>
      </>
       )}
    </div>
   
  );
};

export default CategoriesPage;
