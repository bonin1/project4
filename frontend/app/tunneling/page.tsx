import React from "react";
import Navbar from "../components/globalComponents/Navbar";
import Footer from "../components/globalComponents/Footer/Footer";
import ImageHeader from "../components/tunneling/imageHeader/imageHeader";

const tunneling = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default tunneling
