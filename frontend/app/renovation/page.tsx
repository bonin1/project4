import React from 'react';
import Navbar from '../components/globalComponents/Navbar'
import Footer from '../components/globalComponents/Footer/Footer'
import ImageHeader from '../components/renovation/imageHeader/imageHeader'
import ServiceDetails from '../components/renovation/serviceDetails/serviceDetails'


const renovation = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ImageHeader />
                    <ServiceDetails />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default renovation;