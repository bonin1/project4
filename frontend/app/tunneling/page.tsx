import React from "react";
import Navbar from "../components/globalComponents/Navbar";
import Footer from "../components/globalComponents/Footer/Footer";
import ImageHeader from "../components/tunneling/imageHeader/imageHeader";
import Services from "../components/tunneling/services/Services";
import Statistics from "../components/tunneling/statistics/Statistics";
import Projects from "../components/construction/projects/projects";

const tunneling = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                    <Services />
                    <Statistics />
                    <Projects />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default tunneling
