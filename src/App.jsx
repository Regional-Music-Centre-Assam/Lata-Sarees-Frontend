import { Header } from "./components/Header"
import { HeroSection } from "./components/HeroSection"
import { FeaturedCategories } from "./components/FeaturedCategories"
import { ProductGrid } from "./components/ProductGrid"
import { PromoBar } from "./components/PromoBar"
import { Routes,Route } from "react-router-dom"
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


function App() {
  
  return (
    <CartProvider>

   
    <div >
      {/*
      <main>
        <HeroSection />
        <FeaturedCategories />
        <ProductGrid />
      </main> */}
       <Header />
      <CartSidebar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/placeorder" element={<PlaceOrder/>}/>
        <Route path="/ourcollection" element={<OurCollection/>}/>
        <Route path="/myorders" element={<MyOrders/>}/> 
        <Route path="/auth" element={<AuthPage/>}/> 
        <Route path="/profile" element={<ProfilePage/>}/> 
        <Route path="/profile/editprofile" element={<EditProfileSection/>}/> 
      </Routes>
      <Footer/>
    </div>
    </CartProvider>
  )
}

export default App

