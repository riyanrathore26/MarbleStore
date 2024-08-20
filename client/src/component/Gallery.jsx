import React, { useState } from 'react';
import '../ComponentsCss/Gallery.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Gallery({ productData, productInfo }) {
  const images = productData;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const imagesPerPage = 4;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handleNextSet = () => {
    setCurrentSet((prevSet) => (prevSet < totalPages - 1 ? prevSet + 1 : prevSet));
  };

  const handlePreviousSet = () => {
    setCurrentSet((prevSet) => (prevSet > 0 ? prevSet - 1 : prevSet));
  };

  const handleMouseEnter = (index) => {
    setSelectedImageIndex(index);
  };

  const addtocart = async (id) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/addtocart/${id}`);
      if (response.status === 200) {
        toast.success('Product added to cart successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to add product to cart. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const startIndex = currentSet * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const visibleImages = images.slice(startIndex, endIndex);

  return (
    <div className="gallery">
      <div className="thumbnail-row">
        <div className="thumbnails">
          {visibleImages.map((src, index) => (
            <div
              key={startIndex + index}
              className={`thumbnail ${startIndex + index === selectedImageIndex ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter(startIndex + index)}
            >
              <img src={src} alt={`thumbnail-${startIndex + index}`} />
            </div>
          ))}
        </div>
        {images.length > imagesPerPage && (
          <div className="buttons_of_gallery">
            <button className="nav-button" onClick={handlePreviousSet} disabled={currentSet === 0}>
              <FaAngleLeft />
            </button>
            <button className="nav-button" onClick={handleNextSet} disabled={currentSet === totalPages - 1}>
              <FaAngleRight />
            </button>
          </div>
        )}
      </div>
      <div className="ultra-big">
        <div className="big-image">
          <img src={images[selectedImageIndex]} alt="big" />
        </div>
      </div>
      <div className="information">
        <h2>{productInfo.name}</h2>
        <h2>{productInfo.price}</h2>
        <div className="btn">
          <button>Buy</button>
          <h3>or</h3>
          <button onClick={() => addtocart(productInfo._id)}>Add to cart</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
