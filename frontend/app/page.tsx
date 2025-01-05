"use client";

import React from "react";
import Navbar from "./components/globalComponents/Navbar";
import ImageCarousel from "./components/Home/ImageCarousel/ImageCarousel";
import CardsContainer from "./components/Home/CardsContainer/CardsContainer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="wrapper">
        <div className="wrapper-assist">
          <ImageCarousel />
          <CardsContainer />
        </div>
      </main>
    </div>
  );
}
