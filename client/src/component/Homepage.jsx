import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from './Footer';
import QuestionAnswerDropdown from './QuestionAnswerDropdown'
import Productpage from './Productpage';
// import ChatIcon from './ChatIcon';
// import { useSpring, animated } from '@react-spring/web';
// import ChatWindow from './ChatWindow';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import MultiCarousel from './MultiCarousel';
import SearchBar from './Search';


function Homepage() {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleChat = () => {
  //   setIsOpen(!isOpen);
  // };

  // const chatAnimation = useSpring({
  //   opacity: isOpen ? 1 : 0,
  //   transform: isOpen ? `translateY(0)` : `translateY(100%)`,
  // });

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
      {/* <ChatIcon onClick={toggleChat} />
      <animated.div style={chatAnimation} className="chat-window-container">
        <ChatWindow onClose={toggleChat} />
      </animated.div>       */}
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
