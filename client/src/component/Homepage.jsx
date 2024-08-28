import { FaAngleLeft, FaWhatsapp, FaAngleRight } from 'react-icons/fa';
import QuestionAnswerDropdown from './QuestionAnswerDropdown';
import React, { useEffect, useState } from 'react';
import MultiCarousel from './MultiCarousel';
import Productpage from './Productpage';
import { BASE_URL } from '../config';
import SearchBar from './Search';
import Footer from './Footer';
import axios from 'axios';

function Homepage() {
  const [homeposter, setHomePoster] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/homeposter`);
        setHomePoster(response.data.poster); // Assuming response.data.poster is the array
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [homeposter.length]);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % homeposter.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? homeposter.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="firsthome">
        <div className="home_poster" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          {homeposter.map((poster, index) => (
            <div
              key={index}
              style={{
                display: index === currentIndex ? 'block' : 'none',
                transition: 'opacity 0.5s ease-in-out',
                width: '100%',
              }}
            >
              <img src={poster} alt={`Poster ${index}`} style={{ width: '100%' }} />
            </div>
          ))}
          <div className="button-container">
            <button onClick={prevSlide}>
              <FaAngleLeft />
            </button>
            <button onClick={nextSlide}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      <SearchBar />
      <Productpage showsomething={false} />
      <div className="categoriesContainer">
        <MultiCarousel />
        <QuestionAnswerDropdown />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
