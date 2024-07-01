import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { WithStyles } from 'react-multi-carousel'
import React from "react";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const sliderImageUrl = [
    //First image url
    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "Body Polishing"
    },

    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "De-Tan / Bleach"
    },
    //Second image url
    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "Facial"
    },
    //Third image url
    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "Hair"
    },

    //Fourth image url

    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "Mani padi"
    },
    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "Waxing"
    },
    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "Threading"
    },
    {
        url:
            "https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647",
        title: "EyeYouth Therapy"
    },


];

function MultiCarousel() {


    return (
        <>

            <div className="parent" style={{ width: "80%", margin: "0px auto" }}>
                <Carousel
                    responsive={responsive}
                    autoPlay={1000}
                    swipeable={true}
                    draggable={true}
                    className=""

                    keyBoardControl
                    infinite={true}
                    partialVisible={false}
                    dotListClass="custom-dot-list-style"
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={2}
                >
                    {sliderImageUrl.map((imageUrl, index) => {
                        return (
                            <div className="slider" key={index}>
                                <img src={imageUrl.url} alt="movie" />
                                <h6 className="mt-2">{imageUrl.title}</h6>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </>
    )
}

export default MultiCarousel

// https://vogal-demo.myshopify.com/cdn/shop/files/headphones.jpg?v=1673514647