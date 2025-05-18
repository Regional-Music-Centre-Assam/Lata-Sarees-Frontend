import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import teamPhoto from '../assets/fabricabout.jpg'; // Import your images

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function ModernAboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const texture1Ref = useRef(null);
  const texture2Ref = useRef(null);
  const teamPhotoRef = useRef(null);
  const statsRef = useRef([]);
  const floatingShapesRef = useRef([]);

  useEffect(() => {
    // Set up parallax effects
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Layer animations with different speeds for parallax
    tl.to(texture1Ref.current, { y: 100 }, 0)
      .to(texture2Ref.current, { y: 50 }, 0)
      .to(teamPhotoRef.current, { y: -80 }, 0)
      .to(headingRef.current, { y: -30 }, 0);

    // Floating shapes animation
    floatingShapesRef.current.forEach((shape, i) => {
      gsap.to(shape, {
        y: i % 2 === 0 ? 20 : -20,
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Stats counter animation
    statsRef.current.forEach((stat) => {
      const target = +stat.getAttribute('data-target');
      const count = { value: 0 };
      
      gsap.to(count, {
        value: target,
        duration: 2,
        scrollTrigger: {
          trigger: stat,
          start: "top 80%",
          once: true
        },
        onUpdate: () => {
          stat.textContent = Math.floor(count.value);
        }
      });
    });

    // Text reveal animation
    gsap.utils.toArray(".about-text").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: text,
          start: "top 80%"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative pt-4 pb-28 lg:py-28 overflow-hidden bg-white"
    >
       <div className="container mx-auto px-4 mb-8">
        <h2 className="font-medium mb-2 bg-clip-text text-6xl text-transparent bg-gradient-to-r from-red-400 to-fuchsia-500">Our Story</h2>
        <p className="text-gray-500">Crafted with Heart, Backed by Trust</p>
        
        
      </div>
      {/* Background texture layers */}
      {/* <div 
        ref={texture1Ref}
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/83/55/1e/83551e41de639b212710ead7f2a0a875.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      /> */}
{/*       
      <div 
        ref={texture2Ref}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("https://i.pinimg.com/736x/1c/58/b8/1c58b893b3fe7f162e4366d0bb291579.jpg")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
      /> */}

      {/* Floating decorative shapes */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => floatingShapesRef.current[i] = el}
            className={`absolute rounded-full opacity-10 ${i % 2 === 0 ? 'bg-rose-500' : 'bg-indigo-500'}`}
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
              top: `${10 + i * 10}%`,
              left: `${i % 2 === 0 ? 10 : 80}%`,
              filter: 'blur(20px)'
            }}
          />
        ))}
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Image with parallax */}
          <div className="relative">
            <div className="relative max-h-[300px] lg:max-h-[700px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                ref={teamPhotoRef}
                src={teamPhoto}
                alt="Our textile team"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            {/* Floating tag */}
            <div className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-full ">
              <span className="font-thin text-2xl text-gray-700">Since 2003</span>
            </div>
          </div>

          {/* Right column - Content */}
          <div>
            <h2 
              ref={headingRef}
              className="text-5xl md:text-6xl font-light mb-8 leading-tight"
            >
              Weaving <span className="font-bold bg-gradient-to-r text-white from-red-300 to-fuchsia-500">Stories</span> Through Textiles
            </h2>
            
            <div className="space-y-6">
              <p className="about-text text-lg text-gray-600">
               Founded in 2003 by Lalita Choraria from her own home, She began with a humble collection of Kota Munga sarees. What started as a small passion project by a dedicated housewife soon grew into a trusted name, driven by customer demand and a commitment to quality. By 2008, Lata Sarees proudly opened its first outlet, expanding its offerings to include a wide range of sarees like Supernet, Georgette, and work sarees, along with plain and boutique fabrics. Today, Lata Sarees is known as a one-stop destination for premium sarees, fabrics, suits, and bedsheets — blending tradition with elegance for every occasion.
              </p>
              
              {/* <p className="about-text text-lg text-gray-600">
                We source only the finest materials from ethical suppliers, combining time-honored techniques 
                with modern sustainable practices to create fabrics that stand the test of time.
              </p> */}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-4xl font-bold text-gray-700 mb-2">
                  <span ref={el => statsRef.current[0] = el} data-target="21">0</span>+
                </h3>
                <p className="text-gray-500">Years of Experience</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-4xl font-bold text-gray-700 mb-2">
                  <span ref={el => statsRef.current[1] = el} data-target="500">0</span>+
                </h3>
                <p className="text-gray-500">Fabric Varieties</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-4xl font-bold text-gray-700 mb-2">
                  <span ref={el => statsRef.current[2] = el} data-target="42">0</span>
                </h3>
                <p className="text-gray-500">Skilled Artisans</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-4xl font-bold text-gray-700 mb-2">
                  <span ref={el => statsRef.current[3] = el} data-target="100">0</span>%
                </h3>
                <p className="text-gray-500">Sustainable Materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}