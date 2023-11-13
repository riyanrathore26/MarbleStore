// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Components_css/NavigationBar.css'

const NavigationBar = () => {
  return (
            <nav>
            {/* <image>LOGO</image> */}
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link>Category</Link>
                <ul class="dropdown">
                    <label for='class1'>Slab</label>
                    <div className="class1">
                    <li><Link to="#">white</Link></li>
                    <li><Link to="#">black</Link></li>
                    <li><Link to="#">onex</Link></li>
                    </div>
                </ul>
                </li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/Signup">Signup</Link></li>
            </ul>
            <input type="search" placeholder="Search what you want"></input>
            {/* <img src={search}></img> */}
            </nav>
  );
};

export default NavigationBar;
