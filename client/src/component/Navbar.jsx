import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const activeHamburger = () => {
        setMenuOpen(!menuOpen); // Corrected assignment
        console.log('hamburger')
    }
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("firstname");
        localStorage.removeItem("userId");
        alert("logout");
        navigate("/Login");

    }

    return (
        <>
            <nav>
                <div className="logo">Logo</div>
                <RxHamburgerMenu className='hamburger' onClick={activeHamburger} />

                <ul className={menuOpen ? 'open' : ""}>
                    <li>
                        <Link to='/'>Home</Link>
                        <NavLink to='/Product'>Products</NavLink>
                        <NavLink to='/Contact'>Contact</NavLink>
                        <NavLink to='/About'>About</NavLink>

                        {localStorage.getItem('token') ? (
                            <i className="logout" style={{ color: 'red', cursor: 'pointer' }} onClick={logoutHandler}>
                                <abbr title="Login"><IoIosLogIn /></abbr>
                            </i>
                        ) : (
                            <Link to="/Login">
                                <i className="logout" style={{ color: 'green', cursor: 'pointer' }}>
                                    <abbr title="Login"><IoIosLogIn /></abbr>
                                </i>
                            </Link>
                        )}

                    </li>
                </ul>
            </nav>

        </>
    )
}

export default Navbar
