import { useCart } from '../context/UseCart'; // Import the cart context
import { Link, useNavigate } from 'react-router-dom'; // For navigation

export function Checkout() {
  const { cart } = useCart(); // Access cart data
  const navigate = useNavigate(); // For programmatic navigation

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Redirect to the Place Order Page
    navigate('/placeorder');
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-[5vh] md:px-[7vh] lg:px-[9vh]">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address Details Form */}
          <div className="bg-gray-50 p-6 rounded-lg lg:mx-20 ">
            <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 md:grid-cols-2 space-x-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              {/* Building */}
              <div>
                <label htmlFor="building" className="block text-sm font-medium text-gray-700">
                  Building/Apartment
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Building No. 123"
                  required
                />
              </div>

              {/* Street */}
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Main Street"
                  required
                />
              </div>

              {/* Locality */}
              <div>
                <label htmlFor="locality" className="block text-sm font-medium text-gray-700">
                  Locality
                </label>
                <input
                  type="text"
                  id="locality"
                  name="locality"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Locality Name"
                  required
                />
              </div>

              {/* Landmark */}
              <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
                  Landmark
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Near Central Park"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="City Name"
                  required
                />
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="State Name"
                  required
                />
              </div>

              {/* Pin Code */}
              <div>
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pin"
                  name="pin"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="123456"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Country Name"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors col-span-2"
              >
                Proceed to Payment
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}