"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/Button";
import banner_1_large from '../assets/Banner1_lg.jpg';
import banner_1_sm from '../assets/Banner1_sm.jpg';
import banner_2_large from '../assets/Banner2_lg.jpg';
import banner_2_sm from '../assets/Banner2_sm.jpg';
import banner_3_large from '../assets/Banner3_lg.jpg';
import banner_3_sm from '../assets/Banner3_sm.jpg';
import { Link } from "react-router-dom";

const slides = [
  {
    image: {
      small: "https://i.pinimg.com/736x/83/55/1e/83551e41de639b212710ead7f2a0a875.jpg",

      large: banner_1_sm,
    },
    title: "Endless Love Sale",
    description: "Flat 15% off on all silver jewellery. Use code ENDLESS15 at checkout.",
    buttonText: "Shop Now",
  },
  {
    image: {
      small: "https://i.pinimg.com/736x/1c/58/b8/1c58b893b3fe7f162e4366d0bb291579.jpg",

      large: banner_2_sm,
    },
    title: "Luxury Fabrics",
    description: "Indulge in Opulent and premium craft",
    buttonText: "Explore Collection",
  },
  {
    image: {
      small: "https://i.pinimg.com/736x/61/86/70/618670019ed31e408221bd2cef13bea7.jpg",

      large: banner_3_sm,
    },
    title: "New Arrivals",
    description: "15% OFF on first purchase. Exclusive on App.",
    buttonText: "Download App",
  },
];

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { width } = useWindowSize();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); 

    return () => clearInterval(timer);
  }, []); 
  const getImageUrl = (slide) => {
    return width < 768 ? slide.image.small : slide.image.large;
  };

  return (
    <section className="relative h-[500px] overflow-hidden" style={{ fontFamily: "Outfit, sans-serif" }}>
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${getImageUrl(slide)}')`,
              }}
            />
            <div className="relative h-full ">
              
              <div className="container flex h-full flex-col items-center justify-center gap-4 text-center text-white">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{slide.title}</h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">{slide.description}</p>
                
                <Link to='/ourcollection'>
                <Button
                  className="mt-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-6 rounded-lg"
                  size="lg"
                >
                  {slide.buttonText}
                </Button>
                </Link>
                
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 hover:bg-white/80"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 hover:bg-white/80"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
        <span className="sr-only">Next slide</span>
      </Button>

      
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? "w-4 bg-rose-600" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}