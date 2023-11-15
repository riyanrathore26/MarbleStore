import React from "react";
import '../Components_css/PostData.css'
import logo from '../logo.svg'
const PostData = () =>{
    return (
        <>
    <div className="slideshow-container">
      <div className="mySlides fade post1">
        <img src={logo} alt='' />
      </div>
      {/* <div className="mySlides fade post2">
        <img src={logo} alt='' />
      </div>
      <div className="mySlides fade post3">
        <img src={logo} alt='' />
      </div> */}
      {/* <a className="next" >&#10095;</a>
      <h4 style={{ color: 'black', textAlign: 'start', marginTop: '0%', float: 'left' }}>
        ''<br /><br /><span>Price:-</span>&#x20b9;
      </h4> */}
      {/* <div className="li">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
          onClick={() => toggleColor(record.id, record.name)} className="heart read" aria-hidden="true"
          role="presentation" focusable="false">
          <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791
        0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949
        2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
        </svg>
        <p>{record.like_count}</p>
      </div> */}
      {/* <div className="conn">
        <form name="f1" method="POST" action="/comment1">
          <input type="hidden" name="var" value='' />
          <input type="text" placeholder="add comment" name="comment" id="comment" />
        </form>
      </div> */}
    </div>
        </>
    );
};

export default PostData;