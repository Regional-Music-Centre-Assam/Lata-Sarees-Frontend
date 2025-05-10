import { useRef, useEffect, useState } from 'react';
import { Play, Pause, ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

export function VideoReelsSection() {
  // Refs
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const progressRef = useRef(null);
  const animationRef = useRef(null);
  const videoRefs = useRef([]);
  
  // State
  const [playingId, setPlayingId] = useState(null);

  // Video data
  const reels = [
    { 
      id: 1, 
      title: "Silk Magic", 
      customer: "Priya K.", 
      duration: "0:45",
      video: "blob:https://in.pinterest.com/2ff08e0a-8138-4ca7-8b94-b6f39f952b2c",
      poster: "https://i.pinimg.com/videos/thumbnails/originals/e5/8c/6f/e58c6f46d40aaf810a3170cad0213d62.0000000.jpg",
      color: "bg-rose-100" 
    },
    { 
      id: 2, 
      title: "Cotton Comfort", 
      customer: "Rahul V.", 
      duration: "1:02",
      video: "https://v1.pinimg.com/videos/mc/expMp4/df/d8/37/dfd837c2cbd85f771cae206c8d9c7582_t3.mp4",
      poster: "https://i.pinimg.com/videos/thumbnails/originals/df/d8/37/dfd837c2cbd85f771cae206c8d9c7582.0000000.jpg",
      color: "bg-blue-100" 
    },
    { 
      id: 3, 
      title: "Linen Luxury", 
      customer: "Ananya P.", 
      duration: "0:38",
      video: "https://v1.pinimg.com/videos/mc/hls/22/9b/24/229b24092f90c0da7e9cb6aa5e9bcc13.m3u8",
      poster: "https://i.pinimg.com/736x/04/a1/46/04a1460b92a308bf15f2e26d677f41f5.jpg",
      color: "bg-amber-100" 
    },
    { 
      id: 4, 
      title: "Wedding Elegance", 
      customer: "Neha G.", 
      duration: "0:52",
      video: "https://v1.pinimg.com/videos/mc/expMp4/c8/65/f9/c865f9696281262d33a093fc831d20bd_t1.mp4",
      poster: "https://i.pinimg.com/736x/b5/29/23/b52923892868c8b6b3a5fb2d7677d66b.jpg",
      color: "bg-emerald-100" 
    }
  ];

  // Create duplicated reels for infinite effect
  const duplicatedReels = [...reels, ...reels, ...reels];

  // Initialize GSAP animations
  useEffect(() => {
    const container = containerRef.current;
    const slider = sliderRef.current;
    if (!container || !slider) return;

    const reels = slider.querySelectorAll('.reel-item');
    const reelWidth = reels[0]?.offsetWidth + 24; // width + gap
    const totalWidth = reelWidth * reels.length;
    
    // Set initial position (centered in the duplicated content)
    gsap.set(slider, { x: -reelWidth * reels.length / 3 });

    // Infinite loop animation
    animationRef.current = gsap.to(slider, {
      x: `+=${totalWidth / 3}`,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 3))
      }
    });

    // Progress indicator animation
    gsap.ticker.add(() => {
      if (!progressRef.current) return;
      const progress = (gsap.getProperty(slider, "x") / (totalWidth / 3)) % 1;
      progressRef.current.style.transform = `scaleX(${1 - Math.abs(progress)})`;
    });

    // Pause on hover
    const pauseAnimation = () => animationRef.current?.pause();
    const resumeAnimation = () => animationRef.current?.play();
    
    container.addEventListener('mouseenter', pauseAnimation);
    container.addEventListener('mouseleave', resumeAnimation);

    // Cleanup
    return () => {
      animationRef.current?.kill();
      gsap.ticker.remove(() => {});
      container.removeEventListener('mouseenter', pauseAnimation);
      container.removeEventListener('mouseleave', resumeAnimation);
    };
  }, []);

  // Handle video play/pause
  const toggleVideo = (id) => {
    if (playingId === id) {
      videoRefs.current[id]?.pause();
      setPlayingId(null);
    } else {
      // Pause any currently playing video
      if (playingId) {
        videoRefs.current[playingId]?.pause();
      }
      
      // Play new video
      const video = videoRefs.current[id];
      if (video) {
        video.play()
          .then(() => setPlayingId(id))
          .catch(error => console.error("Video play failed:", error));
      }
    }
  };

  // Manual scroll with momentum
  const scroll = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const currentX = gsap.getProperty(slider, "x");
    const targetX = Number(currentX) + (direction === 'left' ? -300 : 300);
    
    gsap.to(slider, {
      x: targetX,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        // Reset position when near the edge for infinite effect
        const reelWidth = slider.querySelector('.reel-item')?.offsetWidth + 24;
        const threshold = reelWidth * reels.length;
        const currentX = gsap.getProperty(slider, "x");
        
        if (Math.abs(Number(currentX)) > threshold) {
          gsap.set(slider, { x: Number(currentX) % threshold });
        }
      }
    });
  };

  return (
    <section className="relative pt-5 pb-10 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="font-medium bg-clip-text text-6xl text-transparent bg-gradient-to-r from-red-300 to-fuchsia-500">Fabric Stories</h2>
        <p className="text-gray-500">Swipe to explore endless inspiration</p>
        
        {/* Progress bar */}
        <div className="h-0.5 bg-gray-100 mt-6 overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-black origin-left scale-x-0 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Reels container */}
      <div 
        ref={containerRef}
        className="relative py-6 cursor-grab active:cursor-grabbing"
      >
        <div
          ref={sliderRef}
          className="flex space-x-6 w-max px-4" // Added px-4 for better edge spacing
        >
          {duplicatedReels.map((reel, i) => (
            <div
              key={`${reel.id}-${i}`}
              className="reel-item flex-shrink-0 w-[300px] h-[450px] rounded-2xl relative group overflow-hidden"
            >
              {/* Video element */}
              <video
                ref={el => videoRefs.current[reel.id] = el}
                src={reel.video}
                poster={reel.poster}
                loop
                muted
                autoPlay
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                onClick={() => toggleVideo(reel.id)}
              />
              
              {/* Color overlay */}
              <div 
                className={`absolute inset-0 ${reel.color} ${
                  playingId === reel.id ? 'opacity-1' : 'opacity-1'
                } transition-opacity duration-300`} 
              />
              
              {/* Content overlay */}
              <div className="relative h-full flex flex-col justify-between p-6 pointer-events-none">
                <div className="flex justify-between items-start pointer-events-auto">
                  <span className="text-xs bg-black/70 text-white px-2 py-1 rounded-full">
                    {reel.duration}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideo(reel.id);
                    }}
                    className="p-3 bg-black/70 text-white rounded-full backdrop-blur-sm hover:bg-black/90 transition-all pointer-events-auto"
                  >
                    {playingId === reel.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                <div className={`transform transition-all duration-300 ${
                  playingId === reel.id ? 
                    '-translate-y-2 opacity-100' : 
                    'opacity-90 group-hover:opacity-100'
                }`}>
                  <h3 className="text-xl font-medium text-white drop-shadow-md mb-1">
                    {reel.title}
                  </h3>
                  <p className="text-sm text-white/90 drop-shadow-md">
                    {reel.customer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          aria-label="Scroll left"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          aria-label="Scroll right"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}