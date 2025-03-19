"use client"

import { Link } from "react-router-dom";
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/Button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/NavMenu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/Sheet";
import { Input } from "./ui/Input";
import { useCart } from "../context/UseCart";

export function Header() {
  const { toggleCart, cart } = useCart();
  
  return (
    <header className="sticky top-0 z-50 w-full  bg-white">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-4">
              <Link to="/" className="text-lg font-semibold">
                New Arrivals
              </Link>
              {/* <Link to="/" className="text-lg font-semibold">
                Jewelry
              </Link> */}
              <Link to="/" className="text-lg font-semibold">
                Accessories
              </Link>
              <Link to="/" className="text-lg font-semibold">
                Textile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Lata Sarees</span>
        </Link>
        <div className="hidden flex-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>New Arrivals</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4  md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-400 hover:text-white focus:bg-rose-700 focus:text-gray-800"
                          to="/"
                        >
                          Latest Collection
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>Jewelry</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-400 hover:text-white focus:bg-rose-700 focus:text-gray-700"
                          to="/"
                        >
                          Necklaces
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-400 hover:text-white focus:bg-rose-700 focus:text-gray-700"
                          to="/"
                        >
                          Earrings
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-400 hover:text-white focus:bg-rose-700 focus:text-gray-700"
                          to="/"
                        >
                          Bracelets
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-400 hover:text-white focus:bg-rose-700 focus:text-gray-700"
                          to="/"
                        >
                          Bags
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-400 hover:text-white focus:bg-rose-700 focus:text-gray-700"
                          to="/"
                        >
                          Watches
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-rose-700 hover:text-white focus:bg-rose-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-rose-700/50 data-[state=open]:bg-rose-700/50"
                    to="/"
                  >
                    Textile
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <form className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600" />
              <Input type="search" placeholder="Search products..." className="pl-8" />
            </div>
          </form>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5 lg:hidden" />
            <User className="h-5 w-5 hidden lg:block" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          {/* <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button> */}
          <Button variant="ghost" size="icon" onClick={toggleCart} className="relative p-2 hover:bg-gray-100 ">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {cart.length}
            </span>
          )}
        </Button>
        </div>
      </div>
    </header>
  );
}