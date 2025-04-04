import { Header } from "./components/Header"
import { Routes, Route } from "react-router-dom"
import { ProductDetailPage } from './components/Product';
import Home from "./pages/Home"
import Footer from "./components/ui/Footer"
import { CartProvider } from "./context/UseCart"
import { CartSidebar } from "./components/CartSidebar"
import { Checkout } from "./components/Checkout"
import { PlaceOrder } from "./components/PlaceOrder"
import { OurCollection } from "./components/OurCollection"
import { MyOrders } from "./components/MyOrders"
import { AuthPage } from "./components/AuthPage"
import { ProfilePage } from "./components/ProfilePage"
import { EditProfileSection } from "./components/EditProfileSection"
import { useCallback, useEffect, useState } from "react"
import { RetrieveUpdateProfile } from "./Api"
import { Toaster } from "react-hot-toast";


function App() {
  const [user, setUser] = useState(null);

  const fetchUserCallback = useCallback(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const fetchedUser = await RetrieveUpdateProfile({ data: null, showToast: false });
    localStorage.setItem('user', JSON.stringify(fetchedUser));
    setUser(fetchedUser);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <CartProvider>


      <div >
        {/*
      <main>
        <HeroSection />
        <FeaturedCategories />
        <ProductGrid />
      </main> */}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Header />
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/ourcollection" element={<OurCollection />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/profile" element={user == null ? <AuthPage fetchUser={fetchUserCallback} /> : <ProfilePage user={user} fetchUser={fetchUserCallback} />} />
          <Route path="/profile/editprofile" element={user == null ? <AuthPage fetchUser={fetchUserCallback} /> : <EditProfileSection user={user} fetchUser={fetchUserCallback} />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App

