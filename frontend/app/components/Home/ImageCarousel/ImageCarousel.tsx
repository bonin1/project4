'use client';
import React, { useState, useEffect } from 'react';
import './ImageCarousel.scss';

interface SlideContent {
    image: string;
    content?: React.ReactNode;
}

const ImageCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides: SlideContent[] = [
        {
            image: '/image.png',
            content: (
                <div className="slide-content">
                    <p>test</p>
                </div>
            )
        },
        { image: '/image.png' },
        { image: '/image.png' },
        { image: '/image.png' },
        { image: '/image.png' },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="carousel">
            <button className="carousel-arrow prev" onClick={prevSlide}>&#8592;</button>
            <button className="carousel-arrow next" onClick={nextSlide}>&#8594;</button>
            
            <div className="carousel-content">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        {slide.content && (
                            <div className={`content-overlay ${index === currentSlide ? 'active' : ''}`}>
                                {slide.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="carousel-indicators-container">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
