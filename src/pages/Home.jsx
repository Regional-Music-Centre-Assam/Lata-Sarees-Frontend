import {useEffect,React} from 'react'
import { Header } from '../components/Header'
import { PromoBar } from '../components/PromoBar'
import { HeroSection } from '../components/HeroSection'
import { FeaturedCategories } from '../components/FeaturedCategories'
import { ProductGrid } from '../components/ProductGrid'
import Footer from '../components/ui/Footer'

const Home = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
   <div className="flex min-h-screen flex-col">
         {/* <Header/> */}
         <PromoBar />
         <main className=''>
           <HeroSection/>
           <div className='px-4 sm:px-[5vh] md:px-[7vh] '>
           <FeaturedCategories />
           <ProductGrid />
           </div>
           {/* <Footer/> */}
         </main>
    </div>
  )
}

export default Home