// Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogIn } from "react-icons/io";
import profile from '../../images/userImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { inout } from '../slices/authSlice';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const loggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeHamburger = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('email');  // Clear user data from localStorage
        dispatch(inout(false)); // Toggle between true/false
        navigate('/Login');  // Redirect to login page
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);  // Toggle dropdown visibility
    };

    return (
        <nav className="shadow-md sticky top-0 z-10 flex justify-between items-center p-5" style={{ backgroundColor: 'antiquewhite' }}>
            <div className="text-xl font-bold">Logo</div>
            <RxHamburgerMenu
                className="hamburger text-3xl cursor-pointer lg:hidden"
                onClick={activeHamburger}
            />
            <ul
                className={`flex flex-col lg:flex-row lg:items-center lg:space-x-6 lg:static fixed top-16 left-0 w-full bg-antiquewhite lg:w-auto transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
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
                                src={profile}
                                alt="Profile"
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-4 top-14 bg-white shadow-md rounded-md py-2">
                                    <ul className="flex flex-col">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <Link to="/watchlist">Watchlist</Link>
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Logout
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
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
