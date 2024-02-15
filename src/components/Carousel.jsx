import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../css/./Carousel.css';
export const CarouselHome = () => {
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      dynamicHeight={false}
      useKeyboardArrows={true}
      swipeable={true}
    >
      <div className="carousel-slide back">
        <img src="https://res.cloudinary.com/ducg1tnoi/image/upload/v1706904811/d1zgi6h-22b13a26-12ce-4d77-8e42-7c1800d7cd3f.jpg_wnbx5n.jpg" alt="Image 1" />
        <div className="carousel-text">CHOOSE YOUR FIGHTER!</div>
      </div>
      <div className="carousel-slide back">
        <img src="https://res.cloudinary.com/ducg1tnoi/image/upload/v1706905014/wp10644557_ay1ydj.jpg" alt="Image 2" />
        <div className="carousel-text">FROM DIFFERENT ERAS!</div>
      </div>
     
    </Carousel>
  );
};

export default Carousel;
