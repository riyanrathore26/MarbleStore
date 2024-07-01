import React, { useState } from 'react';
import '../ComponentsCss/Gallery.css';

export default function Gallery({ productData }) {
  const images =  productData;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="gallery">
      <div className="big-image">
        <img src={images[selectedImageIndex]} alt="big" />
      </div>
      <div className="thumbnail-row">
        <button className="nav-button" onClick={handlePrevious} disabled={selectedImageIndex === 0}>
          Pre
        </button>
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={src} alt={`thumbnail-${index}`} />
          </div>
        ))}
        <button className="nav-button" onClick={handleNext} disabled={selectedImageIndex === images.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}
