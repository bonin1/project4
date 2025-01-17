import React from "react";
import ImageHeader from "../components/sustainability/imageHeader/imageHeader";
import LivingEarth from "../components/sustainability/livingEarth/livingEarth";
import Navbar from "../components/globalComponents/Navbar";
import Footer from "../components/globalComponents/Footer/Footer";

const sustainable = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                    <LivingEarth />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default sustainable;
