import { useEffect, useRef } from 'react';
import { Trash2, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/UseCart';
import { Link } from 'react-router-dom';

export function CartSidebar() {
  const { 
    cart, 
    removeFromCart, 
    isCartOpen, 
    toggleCart,
    increaseQuantity,
    decreaseQuantity
  } = useCart();
  const sidebarRef = useRef(null);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + (price * item.quantity);
  }, 0);

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div className="fixed inset-0  bg-opacity-50 z-40"></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 right-0 w-85 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Shopping Cart ({cart.length})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto h-[calc(100vh-180px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 mb-4">Your cart is empty.</p>
              <Link
                to="/products"
                onClick={toggleCart}
                className="text-sm text-blue-600 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-start justify-between py-4 border-b">
                  <div className="flex items-start gap-4">
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
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      <p className="text-sm text-gray-500">{item.price}</p>
                      
                      {/* Quantity Counter */}
                      <div className="flex items-center mt-2 border rounded-md w-fit">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={toggleCart} 
            className={`w-full py-3 rounded-md transition-colors block text-center ${
              cart.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
            aria-disabled={cart.length === 0}
          >
            {cart.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
          </Link>
        </div>
      </div>
    </>
  );
}