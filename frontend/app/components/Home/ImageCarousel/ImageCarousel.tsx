'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ImageCarousel.scss';

interface SlideContent {
    image: string;
    content?: React.ReactNode;
    alt?: string;
}

interface ImageCarouselProps {
    slides?: SlideContent[];
    autoplaySpeed?: number;
    showArrows?: boolean;
    showIndicators?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    slides = [
        {
            image: '/image.png',
            alt: 'Carousel image 1',
            content: (
                <div className="slide-content">
                    <p className="slide-subtitle">Welcome to our</p>
                    <h1 className="slide-title">MODERN PLATFORM</h1>
                    <button className='slide-button'>Learn More</button>
                </div>
            )
        },
        { image: '/image.png', alt: 'Carousel image 2' },
        { image: '/image.png', alt: 'Carousel image 3' },
        { image: '/image.png', alt: 'Carousel image 4' },
        { image: '/image.png', alt: 'Carousel image 5' },
    ],
    autoplaySpeed = 6000,
    showArrows = true,
    showIndicators = true
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const carouselRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    // Handle autoplay
    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const timer = setInterval(nextSlide, autoplaySpeed);
        return () => clearInterval(timer);
    }, [nextSlide, isAutoPlaying, autoplaySpeed]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Handle touch events for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const difference = touchStartX.current - touchEndX.current;
        if (difference > 50) nextSlide(); // Swipe left
        if (difference < -50) prevSlide(); // Swipe right
    };

    // Pause autoplay on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    return (
        <div 
            className="carousel"
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Image Carousel"
        >
            {showArrows && (
                <>
                    <button 
                        className="carousel-arrow prev" 
                        onClick={prevSlide}
                        aria-label="Previous slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button 
                        className="carousel-arrow next" 
                        onClick={nextSlide}
                        aria-label="Next slide"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </>
            )}
            
            <div className="carousel-content">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                        aria-hidden={index !== currentSlide}
                    >
                        <div className="slide-overlay"></div>
                        {slide.content && (
                            <div 
                                className={`content-overlay ${index === currentSlide ? 'active' : ''}`}
                                aria-live={index === currentSlide ? "polite" : "off"}
                            >
                                {slide.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {showIndicators && (
                <div className="carousel-indicators-container">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-current={index === currentSlide}
                        />
                    ))}
                </div>
            )}
            
            <div className="slide-counter">
                <span className="current">{currentSlide + 1}</span>
                <span className="separator">/</span>
                <span className="total">{slides.length}</span>
            </div>
        </div>
    );
};

export default ImageCarousel;
