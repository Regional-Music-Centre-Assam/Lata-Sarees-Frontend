"use client"

import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/Button";
import PropTypes from 'prop-types';
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
import { useState } from "react";
import prod_5 from "../assets/ls_logo_1.png";

Header.propTypes = {
  cart: PropTypes.array.isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export function Header({ cart, toggleCart }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isSearchFocused, setIsSearchFocused] = useState(false); // State for search focus

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  // Simulate fetching search results (replace with API call later)
  const fetchSearchResults = async (query) => {
    // Mock data (replace with actual API call)
    const mockProducts = [
      { id: 1, name: "Cotton Embroidery Fabric", category: "fabric" },
      { id: 2, name: "Silk Printed Fabric", category: "fabric" },
      { id: 3, name: "Leather Handbag", category: "accessories" },
    ];

    return mockProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle search input change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const results = await fetchSearchResults(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  // Handle search input blur
  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200); // Delay to allow click on suggestions
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-4">
              <Link to="/" className="text-lg font-semibold" onClick={handleLinkClick}>
                New Arrivals
              </Link>
              <Link to="/" className="text-lg font-semibold" onClick={handleLinkClick}>
                Accessories
              </Link>
              <Link to="/ourcollection" className="text-lg font-semibold" onClick={handleLinkClick}>
                Our Collection
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img src={prod_5} alt="" className="h-7 w-7" />
          <span className="text-xl font-bold">Lata Sarees</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>New Arrivals</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
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
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-rose-500/50 data-[state=open]:bg-rose-500/50"
                    to="/ourcollection"
                  >
                    Our Collection
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Bar and Actions */}
        <div className="ml-auto flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <form className="hidden lg:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </div>
            </form>

            {/* Search Suggestions Overlay */}
            {isSearchFocused && searchQuery.length > 0 && (
              <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="block p-3 hover:bg-gray-100 transition-colors"
                    >
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </Link>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-500">No results found.</div>
                )}
              </div>
            )}
          </div>

          {/* Account Button */}
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              {/* <Search className="h-5 w-5 lg:hidden" /> */}
              <User className="h-5 w-5 " />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link to="/auth">
          {/* Wishlist Button */}
          {/* <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button> */}
          </Link>
          {/* Cart Button */}
          <Button variant="ghost" size="icon" onClick={toggleCart} className="relative p-2 hover:bg-gray-100">
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