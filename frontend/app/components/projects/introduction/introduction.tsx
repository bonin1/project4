import React from 'react'
import './introduction.scss'
import Image from 'next/image'

const Introduction = () => {
    return (
        <section className="projects-intro">
            <div className="row align-items-center g-5">
                <div className="col-lg-6">
                    <h1 className="display-4 fw-bold mb-4">Building Your Vision, <span className="text-primary">Delivering Excellence</span></h1>
                    <p className="lead mb-4">
                        With over two decades of experience, we specialize in delivering 
                        innovative construction solutions across commercial, residential, 
                        and industrial sectors. Our commitment to quality and precision 
                        makes us the trusted choice for transforming ambitious ideas into 
                        remarkable realities.
                    </p>
                    <div className="expertise-badges d-flex flex-wrap gap-2 mb-4">
                        {['Commercial', 'Residential', 'Industrial', 'Renovation'].map((tag, index) => (
                            <span key={index} className="badge bg-light text-dark py-2 px-3">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button className="btn btn-primary btn-lg">View Our Projects</button>
                </div>
                <div className="col-lg-6">
                    <div className="image-container position-relative">
                        <Image
                            src="/modernSolution.jpg"
                            alt="Modern construction project showcase"
                            width={600}
                            height={400}
                            className="rounded-4 shadow-lg img-fluid"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Introduction