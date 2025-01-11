"use client";

import React from "react";
import Navbar from "./components/globalComponents/Navbar";
import ImageCarousel from "./components/Home/ImageCarousel/ImageCarousel";
import CardsContainer from "./components/Home/CardsContainer/CardsContainer";
import Services from "./components/Home/Services/Services";
import Footer from "./components/globalComponents/Footer/Footer";
import Stats from "./components/Home/Stats/Stats";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="wrapper">
        <div className="wrapper-assist">
          <ImageCarousel />
          <Services />
          <Stats />
          <CardsContainer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
