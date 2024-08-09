import React, { useState } from 'react';
import '../ComponentsCss/Gallery.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function Gallery({ productData }) {
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
      <div className="big-image">
        <img src={images[selectedImageIndex]} alt="big" />
      </div>
      <div className="related_product">
        
      </div>
    </div>
  );
}
