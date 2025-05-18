import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cat_1 from "../assets/category/printedfabric.jpg";
import cat_2 from "../assets/category/plainfabric.jpg";
import cat_3 from "../assets/category/embodered.jpg";
import cat_4 from "../assets/category/sarees.jpg";
import cat_5 from "../assets/category/suits.jpg";
import prod_1 from "../assets/category/laheris.jpg";
import prod_2 from "../assets/p_2.jpg";
import prod_3 from "../assets/category/aces.jpg";
import prod_4 from "../assets/category/beedsheet.jpg";

const categories = [
  {
    name: "Printed fabrics",
    image: cat_1,
    variant: "",
  },
  {
    name: "Plain fabrics",
    image: cat_2,
  },
  {
    name: "Embroidered",
    image: cat_3,
  },
  {
    name: "Sarees",
    image: cat_4,
  },
  {
    name: "Suits",
    image: cat_5,
  },
  {
    name: "Bandhej & leheria",
    image: prod_1,
  },
  {
    name: "Readymades",
    image: prod_2,
  },
  {
    name: "Bedsheets",
    image: prod_4,
  },
  {
    name: "Accessories",
    image: prod_3,
  },
  {
    name: "Work Materials",
    image: cat_2,
  },
];

export function FeaturedCategories() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 relative">
              {/* <h2 className="mb-8 text-2xl font-bold">Shop by Category</h2> */}

      <div className="container mx-auto">
        <h2 className="mb-8 text-2xl font-bold">Shop by Category</h2>
        <div className="relative">
          <button onClick={scrollLeft}className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-snap-type-x-mandatory space-x-4 scrollbar-custom"
          >
            {categories.map((category) => (
              <a
                key={category.name}
                href="/"
                className="group flex-shrink-0 md:w-48 w-40 lg:w-52  flex flex-col items-center scroll-snap-align-start"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-full">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="mt-2 text-lg text-gray-500 font-medium text-center">
                  {category.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
