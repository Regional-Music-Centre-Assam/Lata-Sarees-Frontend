"use client"

import { useState } from "react";
import { Link } from "react-router-dom";
import { User, ShoppingBag, Heart, MapPin, CreditCard, LogOut, Settings, Bell } from "lucide-react";
import { Button } from "./ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    avatar: "/path/to/avatar.jpg",
    addresses: [
      {
        id: 1,
        name: "Home",
        address: "123 Fabric Lane, Textile Nagar, Mumbai 400001",
        isDefault: true
      },
      {
        id: 2,
        name: "Work",
        address: "456 Weavers Street, Design District, Mumbai 400002",
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: "card",
        last4: "4242",
        expiry: "12/25",
        isDefault: true
      }
    ]
  });

  const orders = [
    {
      id: "ORD-12345",
      date: "15 Mar 2023",
      status: "Delivered",
      items: [
        { name: "Banarasi Silk Saree", price: 5499, quantity: 1, image: "/path/to/saree1.jpg" },
        { name: "Cotton Dupatta", price: 1299, quantity: 2, image: "/path/to/dupatta1.jpg" }
      ],
      total: 8097
    },
    {
      id: "ORD-12346",
      date: "28 Feb 2023",
      status: "Shipped",
      items: [
        { name: "Chanderi Cotton Saree", price: 3299, quantity: 1, image: "/path/to/saree2.jpg" }
      ],
      total: 3299
    }
  ];

  const wishlist = [
    { id: 1, name: "Kanjivaram Silk Saree", price: 8999, image: "/path/to/saree3.jpg" },
    { id: 2, name: "Handwoven Shawl", price: 2499, image: "/path/to/shawl1.jpg" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Handle address submission
    setEditMode(false);
  };

  return (
    <div className="bg-[] min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 border-2 border-[#8B5A2B]">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback className="bg-[#D2B48C] text-[#3E2723] text-2xl">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#3E2723]">{profileData.name}</h1>
            <p className="text-gray-600 mb-2">{profileData.email}</p>
            <p className="text-gray-600">{profileData.phone}</p>
          </div>
          <div className="flex gap-2">
            <Link to='editprofile'>
            <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B]">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            </Link>
            
            <Button variant="outline" className="border-rose-500 text-rose-500">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="bg-white rounded-lg shadow-sm p-4 lg:col-span-1">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "overview" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <User className="h-5 w-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "orders" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                My Orders
                <span className="ml-auto bg-[#8B5A2B] text-white text-xs px-2 py-1 rounded-full">
                  {orders.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "wishlist" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <Heart className="h-5 w-5 mr-3" />
                Wishlist
                <span className="ml-auto bg-[#8B5A2B] text-white text-xs px-2 py-1 rounded-full">
                  {wishlist.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "addresses" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <MapPin className="h-5 w-5 mr-3" />
                Addresses
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "payments" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Payment Methods
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "notifications" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <Bell className="h-5 w-5 mr-3" />
                Notifications
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#3E2723] mb-6">Account Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-[#D2B48C] rounded-lg p-4">
                    <h3 className="font-medium text-[#8B5A2B] mb-2">Recent Orders</h3>
                    {orders.slice(0, 2).map(order => (
                      <div key={order.id} className="mb-3 pb-3 border-b border-[#F5F5DC] last:border-0">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">#{order.id}</span>
                          <span className={`text-xs px-2 py-1 rounded ${order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{order.date}</p>
                        <p className="text-sm mt-1">₹{order.total.toLocaleString()}</p>
                      </div>
                    ))}
                    <Button
                      variant="link"
                      className="text-[#8B5A2B] p-0 h-auto"
                      onClick={() => setActiveTab("orders")}
                    >
                      View all orders →
                    </Button>
                  </div>
                  <div className="border border-[#D2B48C] rounded-lg p-4">
                    <h3 className="font-medium text-[#8B5A2B] mb-2">Wishlist</h3>
                    {wishlist.slice(0, 2).map(item => (
                      <div key={item.id} className="flex items-center mb-3 pb-3 border-b border-[#F5F5DC] last:border-0">
                        <div className="h-12 w-12 bg-gray-100 rounded mr-3 overflow-hidden">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-sm text-[#8B5A2B]">₹{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="link"
                      className="text-[#8B5A2B] p-0 h-auto"
                      onClick={() => setActiveTab("wishlist")}
                    >
                      View wishlist →
                    </Button>
                  </div>
                </div>
                <div className="border border-[#D2B48C] rounded-lg p-4">
                  <h3 className="font-medium text-[#8B5A2B] mb-3">Default Address</h3>
                  {profileData.addresses.find(addr => addr.isDefault) ? (
                    <div>
                      <p className="font-medium">{profileData.addresses.find(addr => addr.isDefault).name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {profileData.addresses.find(addr => addr.isDefault).address}
                      </p>
                      <Button
                        variant="link"
                        className="text-[#8B5A2B] p-0 h-auto mt-2"
                        onClick={() => setActiveTab("addresses")}
                      >
                        Manage addresses →
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No default address set</p>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#3E2723] mb-6">My Orders</h2>
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border border-[#D2B48C] rounded-lg overflow-hidden">
                        <div className="bg-[#F5F5DC] px-4 py-3 flex justify-between items-center">
                          <div>
                            <span className="font-medium">Order #{order.id}</span>
                            <span className="text-sm text-gray-500 ml-4">{order.date}</span>
                          </div>
                          <span className={`text-sm px-3 py-1 rounded-full ${order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="p-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex py-3 border-b border-[#F5F5DC] last:border-0">
                              <div className="h-16 w-16 bg-gray-100 rounded mr-4 overflow-hidden">
                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₹{item.price.toLocaleString()}</p>
                                {order.status === "Delivered" && (
                                  <Button variant="link" className="text-[#8B5A2B] p-0 h-auto text-sm">
                                    Buy Again
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 bg-[#F9F9F9] flex justify-between items-center">
                          <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B]">
                            View Details
                          </Button>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="font-medium text-lg">₹{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-gray-500">Your order history will appear here</p>
                    <Button className="mt-6 bg-[#8B5A2B] hover:bg-[#A0522D]">
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#3E2723] mb-6">My Wishlist</h2>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                      <div key={item.id} className="border border-[#D2B48C] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-100 overflow-hidden">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-[#8B5A2B] font-medium mt-1">₹{item.price.toLocaleString()}</p>
                          <div className="mt-4 flex gap-2">
                            <Button className="flex-1 bg-[#8B5A2B] hover:bg-[#A0522D]">
                              Add to Cart
                            </Button>
                            <Button variant="outline" className="p-2 border-gray-300">
                              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 font-medium text-gray-900">Your wishlist is empty</h3>
                    <p className="mt-1 text-gray-500">Save items you love for later</p>
                    <Button className="mt-6 bg-[#8B5A2B] hover:bg-[#A0522D]">
                      Browse Collections
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#3E2723]">My Addresses</h2>
                  <Button 
                    className="bg-[#8B5A2B] hover:bg-[#A0522D]"
                    onClick={() => setEditMode(true)}
                  >
                    Add New Address
                  </Button>
                </div>
                
                {editMode ? (
                  <div className="border border-[#D2B48C] rounded-lg p-6">
                    <h3 className="font-medium text-[#8B5A2B] mb-4">Add New Address</h3>
                    <form onSubmit={handleAddressSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                          <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                            <option>Home</option>
                            <option>Work</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="flex items-center mt-6">
                          <input type="checkbox" id="defaultAddress" className="h-4 w-4 text-[#8B5A2B]" />
                          <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700">
                            Set as default address
                          </label>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                        <textarea 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-[100px]"
                          placeholder="House no., Building, Street, Area"
                        ></textarea>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                          <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                          <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button 
                          variant="outline" 
                          className="border-gray-300"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-[#8B5A2B] hover:bg-[#A0522D]">
                          Save Address
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData.addresses.map(address => (
                      <div 
                        key={address.id} 
                        className={`border rounded-lg p-4 ${address.isDefault ? "border-[#8B5A2B]" : "border-gray-200"}`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && (
                            <span className="text-xs bg-[#8B5A2B] text-white px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{address.address}</p>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B]">
                            Edit
                          </Button>
                          <Button variant="outline" className="border-gray-300">
                            Remove
                          </Button>
                          {!address.isDefault && (
                            <Button variant="outline" className="border-gray-300 ml-auto">
                              Set as Default
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payments" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#3E2723]">Payment Methods</h2>
                  <Button className="bg-[#8B5A2B] hover:bg-[#A0522D]">
                    Add Payment Method
                  </Button>
                </div>
                
                {profileData.paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {profileData.paymentMethods.map(payment => (
                      <div 
                        key={payment.id} 
                        className="border border-[#D2B48C] rounded-lg p-4 flex items-center"
                      >
                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                          <CreditCard className="h-5 w-5 text-[#8B5A2B]" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Card ending in {payment.last4}</p>
                          <p className="text-sm text-gray-500">Expires {payment.expiry}</p>
                        </div>
                        {payment.isDefault ? (
                          <span className="text-xs bg-[#8B5A2B] text-white px-2 py-1 rounded-full">
                            Default
                          </span>
                        ) : (
                          <Button variant="outline" className="border-gray-300 text-sm">
                            Set as Default
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 font-medium text-gray-900">No payment methods saved</h3>
                    <p className="mt-1 text-gray-500">Add a payment method for faster checkout</p>
                  </div>
                )}
                
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-[#8B5A2B] mb-4">Payment Preferences</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5A2B]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#3E2723] mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-[#8B5A2B] mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[#F5F5DC] rounded-lg">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-500">Get updates about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5A2B]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#F5F5DC] rounded-lg">
                        <div>
                          <p className="font-medium">Promotions</p>
                          <p className="text-sm text-gray-500">Receive special offers and discounts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5A2B]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#F5F5DC] rounded-lg">
                        <div>
                          <p className="font-medium">New Arrivals</p>
                          <p className="text-sm text-gray-500">Be the first to know about new products</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5A2B]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-[#8B5A2B] mb-3">SMS Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[#F5F5DC] rounded-lg">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-500">Get SMS alerts about your orders</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5A2B]"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#F5F5DC] rounded-lg">
                        <div>
                          <p className="font-medium">Delivery Alerts</p>
                          <p className="text-sm text-gray-500">Get notified when your order is out for delivery</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B5A2B]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}