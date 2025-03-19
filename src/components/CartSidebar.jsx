import { useEffect, useRef } from 'react';
import { Delete, DeleteIcon, Trash2, X } from 'lucide-react';
import { useCart } from '../context/UseCart';
import { Link } from 'react-router-dom';

export function CartSidebar() {
  const { cart, removeFromCart, isCartOpen, toggleCart } = useCart();
  const sidebarRef = useRef(null);

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
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-[calc(100vh-128px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
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
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
          <Link
            to="/checkout"
            onClick={toggleCart} 
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors block text-center"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}