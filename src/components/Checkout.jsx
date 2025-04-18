import { useState } from 'react';
import { useCart } from '../context/UseCart';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, ChevronDown, ChevronUp } from 'lucide-react';

export function Checkout() {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pin: "400001",
      phone: "9876543210"
    },
    {
      id: 2,
      name: "Work",
      street: "456 Business Park",
      city: "Bangalore",
      state: "Karnataka",
      pin: "560001",
      phone: "9876543211"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAddress) return;
    clearCart();
    navigate('/placeorder');
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const form = e.target;
    const newAddress = {
      id: addresses.length + 1,
      name: form.addressName.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      pin: form.pin.value,
      phone: form.phone.value
    };
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress.id);
    setShowAddressForm(false);
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Address Section */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Select Delivery Address</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-sm flex items-center text-blue-600"
              >
                {showAddressForm ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" /> Hide
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1" /> Add New
                  </>
                )}
              </button>
            </div>

            {/* Address Form (Collapsible) */}
            {showAddressForm && (
              <form
                onSubmit={handleAddAddress}
                className="mb-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Address Name
                    </label>
                    <input
                      name="addressName"
                      type="text"
                      placeholder="Home/Work"
                      className="w-full p-2 text-sm border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      className="w-full p-2 text-sm border rounded"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">
                    Street
                  </label>
                  <input
                    name="street"
                    type="text"
                    className="w-full p-2 text-sm border rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      className="w-full p-2 text-sm border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      State
                    </label>
                    <input
                      name="state"
                      type="text"
                      className="w-full p-2 text-sm border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      PIN Code
                    </label>
                    <input
                      name="pin"
                      type="text"
                      className="w-full p-2 text-sm border rounded"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 text-sm rounded"
                >
                  Save Address
                </button>
              </form>
            )}

            {/* Address List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedAddress === address.id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{address.name}</span>
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Implement edit functionality here
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm mt-1">{address.street}</p>
                  <p className="text-sm">{`${address.city}, ${address.state} - ${address.pin}`}</p>
                  <p className="text-sm mt-1">Phone: {address.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/products"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={
                          item.variants &&
                          item.variants[item.selected_variant] &&
                          item.variants[item.selected_variant].images[0]
                            ? item.variants[item.selected_variant].images[0]
                            : "/placeholder.svg"
                        }
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${getTotalPrice().toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <p>Shipping</p>
                  <p>Calculated at next step</p>
                </div>
                <div className="flex justify-between text-lg font-medium text-gray-900 mt-4">
                  <p>Total</p>
                  <p>${getTotalPrice().toFixed(2)}</p>
                </div>
                {/* Place Order Button */}
                <Link to='/placeorder'>
                <button
                  
                  className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Place Order
                </button>
                </Link>
                
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
