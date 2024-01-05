// Home.js
import React from 'react';
import NavigationBar from '../Components/NavigationBar'
import PostData from '../Components/PostData'
import ChatButton from './ChatButton'


const Home = () => {
  return(
    <>
    <NavigationBar/>
    <PostData />
    <ChatButton/>
    </>
  );
};

export default Home;
