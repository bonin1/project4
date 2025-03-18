import React from "react";
import Navbar from "./components/globalComponents/Navbar";
import ImageCarousel from "./components/Home/ImageCarousel/ImageCarousel";
import CardsContainer from "./components/Home/CardsContainer/CardsContainer";
import Services from "./components/Home/Services/Services";
import Footer from "./components/globalComponents/Footer/Footer";
import Stats from "./components/Home/Stats/Stats";

export default function Home() {
  const carouselSlides = [
    {
      image: '/image.png',
      alt: 'Main banner',
      content: (
        <div className="slide-content">
          <p className="slide-subtitle">Welcome to our platform</p>
          <h1 className="slide-title">MODERN SOLUTIONS FOR YOUR BUSINESS</h1>
          <button className='slide-button'>Get Started</button>
        </div>
      )
    },
    { 
      image: '/image.png', 
      alt: 'Our services',
      content: (
        <div className="slide-content">
          <p className="slide-subtitle">Discover</p>
          <h1 className="slide-title">INNOVATIVE SERVICES</h1>
          <button className='slide-button'>Learn More</button>
        </div>
      ) 
    },
    { 
      image: '/image.png', 
      alt: 'About us' 
    },
  ];

  return (
    <div>
      <Navbar />
      <main className="wrapper">
        <div className="wrapper-assist">
          <ImageCarousel 
            slides={carouselSlides}
            autoplaySpeed={5000}
          />
          <Services />
          <Stats />
          <CardsContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
