import React, { useState, useEffect } from 'react';
import { FaHeart, FaAngleLeft, FaWhatsapp, FaAngleRight } from 'react-icons/fa';
import { IoCartOutline } from "react-icons/io5";
import { BiBracket } from "react-icons/bi";
import {Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
function Productpage(props) {
  const randomshow = props.showsomething;
  const [products, setProducts] = useState([]);
  const [index, setindex] = useState(0);
  const [showbigimg, setshowbigimg] = useState(null);
  const navigate = useNavigate();

  const nextPage = (productId) => {
    navigate('/subProduct', { state: { productId } });
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/showProduct`); // Replace with your actual API endpoint
        const data = await response.json();
        if (randomshow == false) {
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
  }, []);
  const showbig = (id) => {
    setshowbigimg(id);
  }
  const quickcloseHandler = () => {
    setindex(0)
    setshowbigimg(false);
  }
  const next = () => {
    if (index < showbigimg?.length - 1) {
      setindex(index + 1);
    } else {
      setindex(0); // Set index to 0 when at the end
    }
  };
  return (
    <div>
      <div className="productpage">
        {products.map((product) => (
          <div className="productbox"
            key={product.id}>
            <div className="waicon">
              <a href={`http://wa.me/your-whatsapp-number?text=I'm interested in ${product.name}`} target="_blank" rel="noreferrer">
                <FaWhatsapp className="whatsapp-icon" style={{ color: 'green', fontSize: '30px' }} />
              </a>
            </div>
            <img className="img1" src={product.images[0]} onClick={() => nextPage(product._id)} alt={product.name} />
            <div className="iconbox">
              <i>
                <FaHeart />
              </i>

              <i>
                <IoCartOutline />
              </i>
              <i>
                <BiBracket onClick={() => { showbig(product.images) }} />
              </i>
            </div>
            <div style={{ position: 'absolute', bottom: '40px', left: "9px" }}>
              <b style={{ marginLeft: '-31px' }}>{product.name}</b>
              <p style={{ margin: '0px 73px 0px 0px' }}>Rs. {product.price}</p>
            </div>
          </div>
        ))}
        {/* <div className="productbox"></div>  */}
        {showbigimg && (
          <>
            <div className="quickbox">
              <div className="quickimg">
                <p>{index}</p>
                <button onClick={quickcloseHandler} style={{ position: 'absolute', cursor: 'pointer' }}>
                  X
                </button>
                <img
                  src={showbigimg[index]}
                />
              </div>
            </div>
            <button className='next' onClick={() => next()} style={{
              position: "absolute",
              padding: "12px",
              borderRadius: "10px",
              margin: "0pc -18pc 10pc 0pc",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              border: "2px solid white"
            }}><FaAngleRight /></button>
          </>
        )}
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
