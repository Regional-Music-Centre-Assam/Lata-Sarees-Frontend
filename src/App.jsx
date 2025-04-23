import { Header } from "./components/Header"
import { Routes, Route } from "react-router-dom"
import { ProductDetailPage } from './components/Product';
import Home from "./pages/Home"
import Footer from "./components/ui/Footer"
import { CartSidebar } from "./components/CartSidebar"
import { Checkout } from "./components/Checkout"
import { PlaceOrder } from "./components/PlaceOrder"
import { OurCollection } from "./components/OurCollection"
import { MyOrders } from "./components/MyOrders"
import { AuthPage } from "./components/AuthPage"
import { ProfilePage } from "./components/ProfilePage"
import { EditProfileSection } from "./components/EditProfileSection"
import { useCallback, useEffect, useState } from "react"
import { ListCreateRetrieveUpdateRemoveCart, RetrieveUpdateProfile } from "./Api"
import { Toaster } from "react-hot-toast";


function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(-1);

  const fetchUser = useCallback(async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const fetchedUser = await RetrieveUpdateProfile({ data: null, showToast: false });
    localStorage.setItem('user', JSON.stringify(fetchedUser));
    setUser(fetchedUser);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);
  
  const listCart = useCallback(async () => {
    const cart = await ListCreateRetrieveUpdateRemoveCart({ data: null, id: null, remove: false, showToast: false });
    setCart(cart ?? []);
    setCartLoading(-2);
  }, []);

  useEffect(() => {
    fetchUser();
    listCart();
  }, [fetchUser, listCart]);

  useEffect(() => {
    calculateTotalPrice(cart);
  }, [cart]);

  const calculateTotalPrice = (cart) => {
    setTotalPrice(cart.reduce((acc, entry) => {
      const variant = entry.variant.variants[entry.variant.selected_variant]

      var price = 0;
      if (variant.pricing) {
        const pricingTier = variant.pricing.find((p) => {
          if (p.maxQuantity === null) return entry.quantity >= p.minQuantity;
          return entry.quantity >= p.minQuantity && entry.quantity <= p.maxQuantity;
        });
        price = pricingTier ? pricingTier.price : 0;
      }

      return acc + (price * entry.quantity);
    }, 0));
    setTotalMrp(cart.reduce((acc, entry) => {
      const variant = entry.variant.variants[entry.variant.selected_variant]
      return acc + (variant.mrp * entry.quantity);
    }, 0));
  }

  return (
    <div >
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Header cart={cart} toggleCart={toggleCart} />
      <CartSidebar cart={cart} listCart={listCart} toggleCart={toggleCart} isCartOpen={isCartOpen} totalPrice={totalPrice} totalMrp={totalMrp} loading={cartLoading} setLoading={setCartLoading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage listCart={listCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} totalPrice={totalPrice} totalMrp={totalMrp} />} />
        <Route path="/placeorder" element={<PlaceOrder cart={cart} />} />
        <Route path="/ourcollection" element={<OurCollection />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/profile" element={user == null ? <AuthPage fetchUser={fetchUser} /> : <ProfilePage user={user} fetchUser={fetchUser} />} />
        <Route path="/profile/editprofile" element={user == null ? <AuthPage fetchUser={fetchUser} /> : <EditProfileSection user={user} fetchUser={fetchUser} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App

