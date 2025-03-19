import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const animateCarouselOnScroll = (
  carouselRef: React.RefObject<HTMLDivElement>,
  slideRefs: HTMLDivElement[] | React.MutableRefObject<HTMLDivElement[]>
) => {
  if (!carouselRef.current) return;
  
  const slides = Array.isArray(slideRefs) ? slideRefs : slideRefs.current;

  gsap.set(carouselRef.current, { opacity: 1, clearProps: "all" });
  
  if (slides[0]) {
    gsap.set(slides[0], { opacity: 1, clearProps: "scale,rotationY" });
    const content = slides[0].querySelector('.content-overlay');
    if (content) {
      gsap.set(content, { opacity: 1, clearProps: "y" });
    }
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: carouselRef.current,
      start: "top 90%", 
      toggleActions: "play none none none"
    }
  });

  let isInViewport = false;
  if (typeof window !== 'undefined' && carouselRef.current) {
    const rect = carouselRef.current.getBoundingClientRect();
    isInViewport = 
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  if (isInViewport) {
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0.7, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    const indicators = carouselRef.current.querySelectorAll('.indicator');
    const arrows = carouselRef.current.querySelectorAll('.carousel-arrow');
    const counter = carouselRef.current.querySelector('.slide-counter');
    
    gsap.fromTo(
      [arrows, indicators, counter],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.2 }
    );
    
    return;
  }

  tl.fromTo(
    carouselRef.current,
    { 
      opacity: 0, 
      y: 50, 
      scale: 0.95
    },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 0.8, 
      ease: "power2.out"
    }
  );

  const indicators = carouselRef.current.querySelectorAll('.indicator');
  const arrows = carouselRef.current.querySelectorAll('.carousel-arrow');
  const counter = carouselRef.current.querySelector('.slide-counter');

  tl.fromTo(
    [arrows, indicators, counter],
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
    "-=0.4"
  );

  return () => {
    if (tl) tl.kill();
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
};

export const animateSlideTransition = (
  currentSlide: HTMLDivElement,
  nextSlide: HTMLDivElement,
  direction: number = 1
) => {
  const currentContent = currentSlide.querySelector('.content-overlay');
  const nextContent = nextSlide.querySelector('.content-overlay');
  
  // Timeline for slide transition
  const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
  
  // Current slide exit animation
  tl.to(currentSlide, {
    opacity: 0,
    scale: 0.9,
    rotationY: direction * -10,
    duration: 0.7,
    ease: "power2.in"
  }, 0);
  
  if (currentContent) {
    tl.to(currentContent, {
      opacity: 0,
      y: -30,
      duration: 0.5
    }, 0);
  }
  
  // New slide enter animation
  tl.set(nextSlide, {
    opacity: 0,
    scale: 1.1,
    rotationY: direction * 10,
    zIndex: 2
  }, 0.3);
  
  tl.to(nextSlide, {
    opacity: 1,
    scale: 1,
    rotationY: 0,
    duration: 0.7,
    ease: "power2.out"
  }, 0.3);
  
  // Animate content elements with a staggered effect
  if (nextContent) {
    const elements = nextContent.querySelectorAll('.slide-subtitle, .slide-title, .slide-button');
    
    tl.set(nextContent, { opacity: 1 }, 0.5);
    tl.fromTo(
      elements,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      0.6
    );
  }
  
  return tl;
};
