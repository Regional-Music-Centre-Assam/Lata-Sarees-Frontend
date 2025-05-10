import { Link, useNavigate } from 'react-router-dom'; // For navigation
import { useEffect, useState } from 'react'; // For managing selected payment method
import { CheckCheckIcon, HandCoins, LoaderCircleIcon } from 'lucide-react'; // React Lucide icons
import PropTypes from 'prop-types';
import { ListCreateRetrieveOrders, OrderPayment } from '../Api';

PlaceOrder.propTypes = {
  totalPrice: PropTypes.number.isRequired, // Prop type for total price
  totalMrp: PropTypes.number.isRequired, // Prop type for total MRP
  selectedAddressId: PropTypes.number, // Prop type for selected address ID
};

export function PlaceOrder({ totalPrice, totalMrp, selectedAddressId }) {
  const navigate = useNavigate(); // For navigation
  const [paymentMethod, setPaymentMethod] = useState('online'); // State for selected payment method
  const [loading, setLoading] = useState(false); // State for loading status

  useEffect(() => {
    if (!selectedAddressId) {
      navigate('/checkout'); // Redirect to checkout if no address is selected
    }
  }, [selectedAddressId, navigate]);

  // Delivery charges logic
  const deliveryCharge = totalPrice > 500 ? 0 : 50; // Free delivery if totalPrice > ₹500, else ₹50
  const totalAmount = totalPrice + deliveryCharge; // Total price including delivery

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true
    var response = await ListCreateRetrieveOrders({
      data: {
        address_id: selectedAddressId,
        payment_method: paymentMethod,
      }
    });
    if (response && response.id) {
      OrderPayment({ id: response.id })
    }
    setLoading(false); // Set loading to false
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-[5vh] md:px-[7vh] lg:px-[9vh]">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Place Order</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payment Method Selection */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Razorpay Option */}
                <div
                  onClick={() => handlePaymentMethodChange('online')}
                  className={`flex items-center hover:bg-emerald-50 gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'online'
                      ? 'border-emerald-500 '
                      : 'border-gray-300 hover:border-emerald-500'
                    }`}
                >
                  <i className="ci ci-razorpay  "></i>
                  <div>
                    <p className="font-medium">Online (Razorpay)</p>
                    <p className="text-sm text-gray-500">Pay with UPI, Cards, or Wallets</p>
                  </div>
                  <CheckCheckIcon className={`h-6 w-6 ms-auto ${paymentMethod === 'online' ? 'text-emerald-500 ' : 'text-gray-300 hover:border-emerald-500'}`} />
                </div>

                {/* Pay on Delivery Option */}
                <div
                  onClick={() => handlePaymentMethodChange('pod')}
                  className={`flex items-center hover:bg-emerald-50 gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'pod'
                      ? 'border-emerald-500 '
                      : 'border-gray-300 hover:border-emerald-500'
                    }`}
                >
                  <HandCoins className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Pay on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                  <CheckCheckIcon className={`h-6 w-6 ms-auto ${paymentMethod === 'pod' ? 'text-emerald-500 ' : 'text-gray-300 hover:border-emerald-500'}`} />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                {loading ? <LoaderCircleIcon className="w-5 h-5 mx-auto animate-spin" /> : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-bold">Subtotal</span>
                <span className='text-end flex flex-col align-end'>
                  <div>
                    <span className='text-lg font-bold'>
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
              <div className="flex justify-between">
                <p className="text-gray-600">Delivery Charges</p>
                <p className="font-medium">
                  {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge.toFixed(2)}`}
                </p>
              </div>
              <div className="flex justify-between border-t pt-4">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Payment Method</p>
                <p className="font-medium capitalize">
                  {paymentMethod === 'pod' ? 'Pay on Delivery' : paymentMethod}
                </p>
              </div>
            </div>
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