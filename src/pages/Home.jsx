import React from 'react'
import {CarouselHome} from '.././components/Carousel.jsx';
import ProductsPage from './ProductsPage.jsx';
import '../css/Home.css';
export const Home = () => {

  return (
    <div className="home-container">
        <CarouselHome className="carousel-home"/>
<ProductsPage  className="products-page"e/>
    </div>
  )
}

export default Home