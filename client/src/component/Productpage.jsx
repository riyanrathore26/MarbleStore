import React, { useState, useEffect } from 'react';
import { FaHeart, FaAngleLeft, FaWhatsapp, FaAngleRight } from 'react-icons/fa';
import { IoCartOutline } from "react-icons/io5";
import { BiBracket } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

function Productpage(props) {
  const randomshow = props.showsomething;
  const [products, setProducts] = useState([]);
  const [indexMap, setIndexMap] = useState({});
  const [showbigimg, setshowbigimg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/showProduct`); // Replace with your actual API endpoint
        const data = await response.json();
        if (!randomshow) {
          const randomProducts = data.slice(); // Create a copy to avoid mutating original data
          if (randomProducts.length >= 6) {
            randomProducts.sort(() => Math.random() - 0.5); // Shuffle the array randomly
            setProducts(randomProducts.slice(0, 6)); // Select the top 5 shuffled elements
          }
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [randomshow]);

  const nextPage = (productId) => {
    navigate('/subProduct', { state: { productId } });
  };

  const showbig = (id) => {
    setshowbigimg(id);
  }

  const next = (productId) => {
    const currentIndex = indexMap[productId] || 0;
    const maxIndex = products.find(product => product._id === productId)?.images.length - 1;

    if (currentIndex < maxIndex) {
      setIndexMap((prevIndexMap) => ({
        ...prevIndexMap,
        [productId]: currentIndex + 1,
      }));
    }
  };

  const previous = (productId) => {
    const currentIndex = indexMap[productId] || 0;

    if (currentIndex > 0) {
      setIndexMap((prevIndexMap) => ({
        ...prevIndexMap,
        [productId]: currentIndex - 1,
      }));
    }
  };

  return (
    <div>
      <div className="productpage">
        {products.map((product) => (
          <div className="productbox" key={product.id}>
            <div className="waicon">
              <a href={`http://wa.me/+916378948871?text=I'm interested in ${product.name}`} target="_blank" rel="noreferrer">
                <FaWhatsapp className="whatsapp-icon" style={{ color: 'green', fontSize: '30px' }} />
              </a>
            </div>
            <div className="button-container">
              <button onClick={() => previous(product._id)}>
                <FaAngleLeft />
              </button>
              <button onClick={() => next(product._id)}>
                <FaAngleRight />
              </button>
            </div>
            <img 
              className="img1" 
              src={product.images[indexMap[product._id] || 0]} 
              onClick={() => nextPage(product._id)} 
              alt={product.name} 
            />
          </div>
        ))}
      </div>
      {
        !randomshow && (
          <div className="viewbox">
            <Link to="/Product" style={{ padding: '15px 40px', borderRadius: '5px', background: 'black', color: 'white', fontSize: '18px' }}>View All</Link>
          </div>
        )
      }
    </div >
  );
}

export default Productpage;
