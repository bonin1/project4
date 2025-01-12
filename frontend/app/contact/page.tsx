import React from 'react'
import ContactForm from '../components/contact/ContactForm';
import Navbar from '../components/globalComponents/Navbar';
import Footer from '../components/globalComponents/Footer/Footer';

const Contact = () => {
    return (
        <div>
            <Navbar />
            <main className="wrapper">
                <div className="wrapper-assist">
                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;