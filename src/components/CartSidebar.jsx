import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Trash2, X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListCreateRetrieveUpdateRemoveCart } from '../Api';
import { LoaderCircle } from "lucide-react";

CartSidebar.propTypes = {
  cart: PropTypes.array.isRequired,
  toggleCart: PropTypes.func.isRequired,
  listCart: PropTypes.func.isRequired,
  isCartOpen: PropTypes.bool.isRequired,
  totalPrice: PropTypes.number.isRequired,
  totalMrp: PropTypes.number.isRequired,
  loading: PropTypes.number.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export function CartSidebar({ cart, toggleCart, listCart, isCartOpen, totalPrice, totalMrp, loading, setLoading }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const effect = async () => {
      await listCart();
    }
    effect();
  }, [listCart, setLoading]);

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
        className={`fixed inset-y-0 right-0 w-85 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Shopping Cart ({(() => {
            var count = 0;
            cart.forEach((entry) => {
              count += entry.quantity;
            });
            return count;
          })()})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-180px)]">
          {loading == -1 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <LoaderCircle className="animate-spin h-16 w-16 text-pink-700" />
            </div>
          ) : cart.length === 0 ? (
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
              {cart.map((entry, index) => {
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

                return <div key={entry.id} className="flex items-start justify-between py-4 border-b">
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
                        <span className='text-gray-500'>₹{price}</span>
                        {variant.mrp > price && <span className='text-gray-500 line-through ms-1'>₹{variant.mrp}</span>}
                        <span className='text-gray-500 ms-1'>x {entry.quantity}</span>
                      </div>

                      {/* Quantity Counter */}
                      <div className="flex items-center mt-2 border rounded-md w-fit">
                        <button
                          onClick={async () => {
                            setLoading(index);
                            if (await ListCreateRetrieveUpdateRemoveCart({ data: { quantity: entry.quantity - 1 }, id: entry.id, remove: true, showToast: false })) {
                              await listCart();
                            }
                            setLoading(-2);
                          }}
                          className="px-2 py-1 hover:bg-gray-100"
                          disabled={entry.quantity <= 1 || loading > -2}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm">{loading == index ? <LoaderCircle className="animate-spin h-5 w-5 text-gray-500" /> : entry.quantity}</span>
                        <button
                          onClick={async () => {
                            setLoading(index);
                            if (await ListCreateRetrieveUpdateRemoveCart({ data: { quantity: entry.quantity + 1 }, id: entry.id, remove: true, showToast: false })) {
                              await listCart();
                            }
                            setLoading(-2);
                          }}
                          disabled={loading > -2}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      setLoading(index);
                      await ListCreateRetrieveUpdateRemoveCart({ data: null, id: entry.id, remove: true, showToast: false });
                      await listCart();
                      setLoading(-2);
                    }}
                    disabled={loading > -2}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              })}
            </div>
          )}
        </div>

        {/* Checkout Footer */}
        {cart.length > 0 && <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal</span>
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
          <Link
            to="/checkout"
            onClick={toggleCart}
            className={`w-full py-3 rounded-md transition-colors block text-center ${cart.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800'
              }`}
            aria-disabled={cart.length === 0}
          >
            {cart.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
          </Link>
        </div>}
      </div>
    </>
  );
}