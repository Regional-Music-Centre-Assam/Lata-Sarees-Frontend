import { Heart, Star } from "lucide-react";
import { Link } from 'react-router-dom'; 
import { useEffect, useState } from "react";
// const products = [
//   {
//     id: 1,
//     name: "Cotton Embroidery Fabric",
//     price: "₹1,999",
//     image: "https://saroj.in/cdn/shop/files/WhatsAppImage2025-02-20at17.02.22_370c320d.jpg",
//     rating: 4.5,
//     reviews: 12,
//   },
//   {
//     id: 2,
//     name: "Silk Printed Fabric",
//     price: "₹1,499",
//     image: "https://saroj.in/cdn/shop/files/WhatsAppImage2024-04-19at7.49.57PM_f16b0018-d64e-447b-a413-f38cbc3cde60.jpg",
//     rating: 4.2,
//     reviews: 8,
//   },
//   {
//     id: 3,
//     name: "Linen Blend Fabric",
//     price: "₹2,999",
//     image: "https://saroj.in/cdn/shop/files/rn-image_picker_lib_temp_12f57afc-5bf3-4797-927e-efbd9250fdca.jpg",
//     rating: 4.7,
//     reviews: 15,
//   },
//     {
//       id: 5,
//       name: "Leather Handbag",
//       image: "https://saroj.in/cdn/shop/files/WhatsAppImage2025-02-20at17.21.20_5429d655.jpg",  // Add appropriate image
//       category: "accessories", // Added category
//       rating: 4.7,
//       reviews: 20,
//       description: "A stylish leather handbag, perfect for everyday use.",
//       details: "Material: Genuine Leather | Care: Wipe with a damp cloth",
//       shipping: "Free shipping on orders above ₹2,000",
//       careInstructions: "Avoid exposure to water and direct sunlight.",
//       quality: "Premium Quality Leather",
//       benefits: [
//         "Durable and long-lasting",
//         "Stylish and versatile",
//         "Perfect for all occasions",
//       ],
//       price: "₹2,500", // Fixed price for non-fabric products
//     },
// ];

export function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="bg-white">
     
     <section className="relative bg-cover bg-center h-50">

      {/* <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${banner_1_large})` }}> */}
        <div className="absolute inset-0  opacity-50"></div>
        <div className="relative container mx-auto flex items-center justify-center h-full">
          <div className="text-center text-gray-700">
            <h1 className="text-5xl font-bold mb-4">Discover Our New Collection</h1>
            <p className="text-xl">Elegant fabrics and clothes for every occasion</p>
          </div>
        </div>
      </section>

     
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="mb-8 text-2xl font-bold">New Arrivals</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`} className="relative block aspect-square">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute right-2 top-2 p-2 bg-white rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </button>
                </Link>
                <div className="mt-4 space-y-1">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
     
    </div>
  );
}