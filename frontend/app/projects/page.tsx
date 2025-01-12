import React from 'react'
import './projects.scss'
import Introduction from '../components/projects/introduction/introduction'
import ProjectsShow from '../components/projects/projectsShow/projectsShow'
import Navbar from '../components/globalComponents/Navbar'
import Footer from '../components/globalComponents/Footer/Footer'

const Projects = () => {
    return (
        <div>
            <Navbar />
            <main className='wrapper'>
                <div className="wrapper-assist">
                    <Introduction />
                    <ProjectsShow />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Projects
