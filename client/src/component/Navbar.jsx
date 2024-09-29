// Navbar.jsx
import React, { useState,useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogIn } from "react-icons/io";
import profile from '../../images/userImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { inout } from '../slices/authSlice';
import { VscSignOut } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { TbListSearch } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../config'
// import SearchBar from './Search'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileData, setProfileData] = useState({});

    const loggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const activeHamburger = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/api/profile/${email}`);
            setProfileData(response.data);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
        const email = localStorage.getItem('email');
        if (email){
            fetchProfileData();
        }
      }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('email');
        dispatch(inout(false));
        navigate({currentPath});
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="shadow-md sticky top-0 z-10 flex justify-between items-center p-5" style={{ backgroundColor: 'antiquewhite' }}>
            <div className="text-xl font-bold">Logo</div>
            <RxHamburgerMenu
                className="hamburger text-3xl cursor-pointer lg:hidden"
                onClick={activeHamburger}
            />
            <ul
                className={`nvclg flex flex-col lg:flex-row lg:items-center lg:space-x-6 lg:static fixed top-16 right-0 w-full bg-antiquewhite lg:w-auto transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <li>
                    <NavLink to='/' className="block py-2 px-4 hover:text-blue-600 transition duration-300">Home</NavLink>
                </li>
                <li>
                    <NavLink to='/Product' className="block py-2 px-4 hover:text-blue-600 transition duration-300">Products</NavLink>
                </li>
                <li>
                    <NavLink to='/Contact' className="block py-2 px-4 hover:text-blue-600 transition duration-300">Contact</NavLink>
                </li>
                <li>
                    <NavLink to='/About' className="block py-2 px-4 hover:text-blue-600 transition duration-300">About</NavLink>
                </li>
                <li>
                    {loggedIn ? (
                        <>
                            <img
                                src={profileData.profilepic||profile}
                                alt="Profile"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-4 top-14 bg-white shadow-md rounded-md py-2">
                                    <ul className="flex flex-col">
                                        <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                                            <CgProfile /><Link to="/profile">Profile</Link>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <TbListSearch/><Link to="/watchlist">Watchlist</Link>
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <VscSignOut />Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to="/Login" className="block py-2 px-4 text-green-600">
                            <abbr title="Login">
                                <IoIosLogIn className="text-2xl" />
                            </abbr>
                        </Link>
                    )}
                {/* <SearchBar/> */}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;