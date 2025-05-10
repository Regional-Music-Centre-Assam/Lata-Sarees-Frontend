import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, LoaderCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { ListCreateRetrieveUpdateRemoveAddress } from '../Api';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      variant: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        selected_variant: PropTypes.number,
        variants: PropTypes.arrayOf(
          PropTypes.shape({
            images: PropTypes.arrayOf(PropTypes.string)
          })
        )
      }),
    })
  ).isRequired,
  cartLoading: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  totalMrp: PropTypes.number.isRequired,
  selectedAddressId: PropTypes.number,
  setSelectedAddressId: PropTypes.func.isRequired,
};

export function Checkout({ cart, cartLoading, totalPrice, totalMrp, selectedAddressId, setSelectedAddressId }) {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    var fetchedAddresses = await ListCreateRetrieveUpdateRemoveAddress({ data: null, id: null, remove: false });
    if (fetchedAddresses)
      setAddresses(fetchedAddresses);
    setLoadingAddresses(false);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAddressId)
      toast.error('Please select a delivery address');
    else
      navigate('/placeorder');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address Section */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Select Delivery Address</h2>
            </div>

            {/* Address List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {loadingAddresses ? (
                <div className="text-center py-8">
                  <LoaderCircle className="w-8 h-8 mx-auto text-gray-500 animate-spin" />
                </div>
              ) : addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddressId(address.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.id
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

          {cartLoading > -2 ? (
            <div className="text-center py-8">
              <LoaderCircle className="w-8 h-8 mx-auto text-gray-500 animate-spin" />
            </div>
          ) : cart.length === 0 ? (
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
                {cart.map((entry) => {
                  const item = entry.variant;
                  const variant = item.variants[item.selected_variant]

                  var price = 0;
                  if (variant.pricing) {
                    const pricingTier = variant.pricing.find((p) => {
                      if (p.maxQuantity === null) return entry.quantity >= p.minQuantity;
                      return entry.quantity >= p.minQuantity && entry.quantity <= p.maxQuantity;
                    });
                    price = pricingTier ? pricingTier.price : 0;
                  }

                  return <div key={entry.id} className="flex items-start justify-between py-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={
                          item.variants &&
                            variant &&
                            variant.images[0]
                            ? variant.images[0]
                            : "/placeholder.svg"
                        }
                        alt={`${item.name} (${variant.name})`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-lg">{`${item.name} (${variant.name})`}</p>
                        <div>
                          <span className='text-lg text-gray-800'>₹{price * entry.quantity}</span>
                          {variant.mrp > price && <>
                            <span className='text-gray-500 line-through ms-1'>₹{variant.mrp * entry.quantity}</span>
                            <span className='text-gray-500 ms-2'>{(() => {
                              const discount = (variant.mrp - price) / variant.mrp * 100;
                              return `(${discount.toFixed(0)}% off)`;
                            })()}</span>
                          </>}
                        </div>
                        <div>
                          <span className='text-gray-500 ms-1'>{entry.quantity} x</span>
                          <span className='text-gray-500'>₹{price}</span>
                          {variant.mrp > price && <span className='text-gray-500 line-through ms-1'>₹{variant.mrp}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                })}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Subtotal</span>
                  <span className='text-end flex flex-col align-end'>
                    <div>
                      <span className='font-bold'>
                        ₹{(totalPrice).toFixed(2)}
                      </span>
                      {(() => {
                        const savings = (totalMrp - totalPrice);
                        return savings > 0 ? <span className='text-gray-500 ms-2'>{`(saved ₹${savings.toFixed(0)})`}</span> : '';
                      })()}
                    </div>
                    <div>
                      {totalMrp > totalPrice && <span className='text-gray-500 line-through'>₹{totalMrp.toFixed(2)}</span>}
                      {(() => {
                        const discount = (totalMrp - totalPrice) / totalMrp * 100;
                        return discount > 0 ? <span className='text-gray-500 ms-2'>{`(${discount.toFixed(0)}% off)`}</span> : '';
                      })()}
                    </div>
                  </span>
                </div>
                {/* Place Order Button */}
                <Button className="mt-6 w-full bg-black text-white py-3 rounded-md hover:bg-gray-700 transition-colors" onClick={handleSubmit}>
                  Place Order
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
