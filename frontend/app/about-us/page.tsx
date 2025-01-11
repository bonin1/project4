import React from 'react'
import './about.scss'
import Navbar from '../components/globalComponents/Navbar'
import CompanyOverview from '../components/aboutus/companyOverview/companyOverview'
import LeaderShip from '../components/aboutus/Leadership/Leadership'
import Milestone from '../components/aboutus/milestones/Milestone'
import Footer from '../components/globalComponents/Footer/Footer'

const aboutus = () => {
    return (
        <div className="about-page">
            <Navbar />
            <main className='wrapper'>
                <div className="wrapper-assist">
                    <CompanyOverview />
                    <Milestone />
                    <LeaderShip />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default aboutus
