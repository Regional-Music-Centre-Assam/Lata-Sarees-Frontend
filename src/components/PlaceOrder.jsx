import { useCart } from '../context/UseCart'; // Import the cart context
import { Link } from 'react-router-dom'; // For navigation
import { useState } from 'react'; // For managing selected payment method
import { CreditCard, Wallet, HandCoins } from 'lucide-react'; // React Lucide icons

export function PlaceOrder() {
  const { cart } = useCart(); // Access cart data
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // State for selected payment method

  const subtotal = cart.reduce((total, item) => {
    const unitPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    return total + unitPrice * item.quantity;
  }, 0);
  

  // Delivery charges logic
  const deliveryCharge = subtotal > 500 ? 0 : 50; // Free delivery if subtotal > ₹500, else ₹50
  const totalPrice = subtotal + deliveryCharge; // Total price including delivery

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Order placed successfully using ${paymentMethod}.`);
    // You can add further logic here, like sending the order to the backend
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
                  onClick={() => handlePaymentMethodChange('razorpay')}
                  className={`flex items-center hover:bg-emerald-50 gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-emerald-500 '
                      : 'border-gray-300 hover:border-emerald-500'
                  }`}
                >
                  <i className="ci ci-razorpay  "></i>
                  <div>
                    <p className="font-medium">Razorpay</p>
                    <p className="text-sm text-gray-500">Pay with UPI, Cards, or Wallets</p>
                  </div>
                </div>

                {/* Stripe Option */}
                <div
                  onClick={() => handlePaymentMethodChange('stripe')}
                  className={`flex items-center hover:bg-emerald-50 gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'stripe'
                      ? 'border-emerald-500 '
                      : 'border-gray-300 hover:border-emerald-500'
                  }`}
                >
                  <i className="ci ci-stripe"></i>
                  <div>
                    <p className="font-medium">Stripe</p>
                    <p className="text-sm text-gray-500">Pay with Credit or Debit Card</p>
                  </div>
                </div>

                {/* Cash on Delivery Option */}
                <div
                  onClick={() => handlePaymentMethodChange('cod')}
                  className={`flex items-center hover:bg-emerald-50 gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-emerald-500 '
                      : 'border-gray-300 hover:border-emerald-500'
                  }`}
                >
                  <HandCoins className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when your order arrives</p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Delivery Charges</p>
                <p className="font-medium">
                  {deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge.toFixed(2)}`}
                </p>
              </div>
              <div className="flex justify-between border-t pt-4">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">₹{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Payment Method</p>
                <p className="font-medium capitalize">
                  {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod}
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