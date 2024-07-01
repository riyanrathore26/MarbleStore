import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from './Footer';
import QuestionAnswerDropdown from './QuestionAnswerDropdown'
import Productpage from './Productpage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import MultiCarousel from './MultiCarousel';
import SearchBar from './Search';


function Homepage() {
  return (
    <>
    <div className="firsthome">
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><div className='sliderbox'>k</div></SwiperSlide>
        <SwiperSlide><div className='sliderbox'>k</div></SwiperSlide>
        <SwiperSlide><div className='sliderbox'>k</div></SwiperSlide>
        <SwiperSlide><div className='sliderbox'>k</div></SwiperSlide>
      </Swiper>
      </div>
      <SearchBar/>
      <Productpage showsomething={false} />
      <div className="categoriesContainer">
        <MultiCarousel/>
        <QuestionAnswerDropdown/>
      <Footer></Footer>
      </div>
    </>

  )
}

export default Homepage
