import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Star,
  ShoppingCart,
  Truck,
  Leaf,
  ThumbsUp,
  LoaderCircle,
} from "lucide-react";
import { ListRetrieveProducts, ListCreateRetrieveUpdateRemoveCart } from "../Api";
import PropTypes from 'prop-types';

ProductDetailPage.propTypes = {
  listCart: PropTypes.func.isRequired,
};

export function ProductDetailPage({ listCart }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // New states for variant selection
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Scroll to top when product id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Load product and initialize variant selection state
  useEffect(() => {
    const loadProduct = async () => {
      setProduct(await ListRetrieveProducts({
        id: id,
      }));
      setLoading(false);
    }

    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setRelatedProducts(product.related_products || []);
      setSelectedVariant(product.selected_variant || 0);
      setSelectedSize(product.variants[product.selected_variant]?.size || null);
      setSelectedColor(product.variants[product.selected_variant]?.color_name || null);
    }
  }, [product])

  // When the user updates either size or color, determine the matching variant index.
  useEffect(() => {
    if (product) {
      const index = product.variants.findIndex(
        (v) => v.size === selectedSize && v.color_name === selectedColor
      );
      if (index !== -1) {
        setSelectedVariant(index);
      }
    }
  }, [selectedSize, selectedColor, product]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <LoaderCircle className="animate-spin h-16 w-16 text-pink-500" />
      </div>
    );
  }

  // Use the currently selected variant
  const variant =
    product.variants && product.variants[selectedVariant]
      ? product.variants[selectedVariant]
      : null;

  // Determine if the product is a fabric based on its categories (case-insensitive)
  const isFabric = product.categories
    ? product.categories.some((cat) => cat.toLowerCase() === "fabric")
    : false;

  // Calculate price for products based on quantity and tiered pricing,
  const calculatePrice = (quantity) => {
    if (!variant || !variant.pricing) return 0;
    const pricingTier = variant.pricing.find((p) => {
      if (p.maxQuantity === null) return quantity >= p.minQuantity;
      return quantity >= p.minQuantity && quantity <= p.maxQuantity;
    });
    return pricingTier ? pricingTier.price : 0;
  };

  const price = calculatePrice(quantity); // Price per unit (or per meter for fabric)
  const totalPrice = price * quantity;

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    if (await ListCreateRetrieveUpdateRemoveCart({
      data: {
        variant: variant.id,
        quantity: quantity,
      },
    })) {
      setQuantity(1);
      await listCart();
    }
    setLoading(false);
  };

  // Get unique sizes and colors from the available variants
  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const availableColors = [...new Set(product.variants.map((v) => v.color_name))];

  return (
    <div className="bg-white py-12 px-4 sm:px-[5vh] md:px-[7vh] lg:px-[9vh]">
      <div className="container mx-auto">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square">
            <img
              src={
                variant && variant.images && variant.images[0]
                  ? variant.images[0]
                  : "/placeholder.svg"
              }
              alt={product.name}
              className="object-cover w-full h-full rounded-lg"
            />
            <button className="absolute right-2 top-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </button>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {product.rating > 0 || product.reviews > 0 && <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < (product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                ({product.reviews || 0} reviews)
              </span>
            </div>}

            {/* Variant Selector UI */}
            {product.variants.length > 1 && (
              <div className="mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Select Color</h3>
                  <div className="flex space-x-2 mt-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        disabled={loading}
                        className={`px-4 py-2 border rounded ${
                          selectedColor === color ? "border-blue-600" : "border-gray-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                  <div className="flex space-x-2 mt-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        disabled={loading}
                        className={`px-4 py-2 border rounded ${
                          selectedSize === size ? "border-blue-600" : "border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Input */}
            <div className="space-y-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity {isFabric && <>(in meters)</>}
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                  disabled={loading}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  disabled={loading}
                  min="1"
                  className="mt-1 block w-20 p-2 border border-gray-300 rounded-md text-center"
                />
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={loading}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Display */}
            <p className="text-2xl font-semibold">
              <div>
                <span>Total Price: ₹{totalPrice}</span>
                <span className="text-sm text-gray-500 line-through ms-2">₹{quantity*variant.mrp}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">₹{price}</span>
                <span className="text-sm text-gray-500 line-through ms-2">₹{variant.mrp}</span>
                <span className="text-sm text-gray-500 ms-2">{isFabric ? 'per meter' : 'per piece'}</span>
                <span className="text-sm text-gray-500 ms-2">{(() => {
                  const discount = Math.round(((variant.mrp - price) / variant.mrp) * 100);
                  return discount > 0 ? `(${discount}% off)` : '';
                })()}</span>
              </div>
            </p>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
            </button>

            {/* Quality Section */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium">{product.quality}</p>
                <p className="text-sm text-gray-500">Eco-friendly and sustainable</p>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Product Details (Key-Value Rendering) */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Details</h2>
              {product.details &&
                Object.entries(product.details).map(([key, value]) => (
                  <p key={key} className="text-gray-600">
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Benefits</h2>
              <ul className="space-y-2">
                {product.benefits &&
                  product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Shipping Information */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium">Shipping Information</p>
                <p className="text-sm text-gray-500">Standard shipping available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => {
              const relatedVariant =
                relatedProduct.variants &&
                relatedProduct.variants[relatedProduct.selected_variant]
                  ? relatedProduct.variants[relatedProduct.selected_variant]
                  : null;
              const relatedRating = relatedProduct.rating || 0;
              const relatedReviews = relatedProduct.reviews || 0;
              const relatedPrice =
                relatedVariant && relatedVariant.pricing
                  ? relatedVariant.pricing[0]?.price
                  : "N/A";

              return (
                <div key={relatedProduct.id} className="group relative">
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="relative block aspect-square"
                  >
                    <img
                      src={
                        relatedVariant && relatedVariant.images && relatedVariant.images[0]
                          ? relatedVariant.images[0]
                          : "/placeholder.svg"
                      }
                      alt={relatedProduct.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <button className="absolute right-2 top-2 p-2 bg-white rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                      <Heart className="h-5 w-5" />
                      <span className="sr-only">Add to wishlist</span>
                    </button>
                  </Link>
                  <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-medium">{relatedProduct.name}</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(relatedRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        ({relatedReviews})
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">₹{relatedPrice}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
