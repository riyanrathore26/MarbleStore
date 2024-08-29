import React from 'react'
import Navbar from './component/Navbar'
import Homepage from './component/Homepage';
import Blog from './component/Blog';
import About from './component/About'
import Contact from './component/Contact';
import AdminPage from './component/AdminPage';
import Quickpage from './component/Quickpage';
import './ComponentsCss/import';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Productpage from './component/Productpage';
import Footer from './component/Footer';
import Loginsignup from './authComponent/Loginsignup';


function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <><Navbar/><Homepage/></>
    },
    {
      path: "/Blog",
      element: <><Navbar/><Blog/></>
    },
    {
      path: "/Contact",
      element: <><Navbar/><Contact/></>
    },
    {
      path: "/About",
      element: <><Navbar/><About/></>
    },
    {
      path: "/Product",
      element: <><Navbar /><Productpage showsomething={true} /></>, // Show all products on this page
    },    
    {
      path: "/Footer",
      element: <><Navbar/><Footer/></>
    },
    {
      path: "/Login",
      element: <><Navbar/><Loginsignup showlogin={true}/></>
    },
    {
      path: "/Signup",
      element: <><Navbar/><Loginsignup showlogin={false}/></>
    },
    {
      path: "/",
      element: <><Navbar/><AdminPage/></>
    },
    {
      path: "/subProduct",
      element: <><Navbar/><Quickpage/></>
    }
    ]);
  

  return (
    <div>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App
