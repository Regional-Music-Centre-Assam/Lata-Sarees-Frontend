"use client"

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, MapPin, LogOut, Settings } from "lucide-react";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import PropTypes from "prop-types";
import { ListCreateRetrieveOrders, ListCreateRetrieveUpdateRemoveAddress, Logout } from "../Api";
import { AddressForm } from "./AddressForm";

ProfilePage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }).isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export function ProfilePage({ user, fetchUser }) {
  const [activeTab, setActiveTab] = useState("orders");
  const [editMode, setEditMode] = useState(-2);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const fetchOrders = async () => {
    var fetchedOrders = await ListCreateRetrieveOrders({ data: null, id: null });
    setOrders(fetchedOrders);
  }

  const fetchAddresses = async () => {
    var fetchedAddresses = await ListCreateRetrieveUpdateRemoveAddress({ data: null, id: null, remove: false });
    setAddresses(fetchedAddresses);
  }

  useEffect(() => {
    fetchUser();
    fetchOrders();
    fetchAddresses();
  }, [fetchUser]);

  return (
    <div className="bg-[] min-h-screen py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 border-2 border-[#8B5A2B]">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-[#D2B48C] text-[#3E2723] text-2xl">
                {user.user.first_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#3E2723]">{`${user.user.first_name} ${user.user.last_name}`}</h1>
            <p className="text-gray-600 mb-2">{user.user.email}</p>
            <p className="text-gray-600">{user.user.username}</p>
          </div>
          <div className="flex gap-2">
            <Link to='editprofile'>
              <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B]">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>

            <Button variant="outline" className="border-rose-500 text-rose-500" onClick={() => { Logout(); fetchUser(); }}>
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
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "orders" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                My Orders
                <span className="ml-auto bg-[#8B5A2B] text-white text-xs px-2 py-1 rounded-full">
                  {orders.length}
                </span>
              </button>
              {/* <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "wishlist" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <Heart className="h-5 w-5 mr-3" />
                Wishlist
                <span className="ml-auto bg-[#8B5A2B] text-white text-xs px-2 py-1 rounded-full">
                  {wishlist.length}
                </span>
              </button> */}
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "addresses" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <MapPin className="h-5 w-5 mr-3" />
                Addresses
              </button>
              {/* <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === "notifications" ? "bg-[#F5F5DC] text-[#8B5A2B]" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <Bell className="h-5 w-5 mr-3" />
                Notifications
              </button> */}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
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
            {/* {activeTab === "wishlist" && (
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
            )} */}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#3E2723]">My Addresses</h2>
                  <Button
                    className="bg-[#8B5A2B] hover:bg-[#A0522D]"
                    onClick={() => setEditMode(-1)}
                  >
                    Add New Address
                  </Button>
                </div>

                <div>
                  {editMode == -1 && <div className="border border-[#D2B48C] rounded-lg p-6">
                    <h3 className="font-medium text-[#8B5A2B] mb-4">Add New Address</h3>
                    <AddressForm onCancel={() => setEditMode(-2)} onSubmit={() => { setEditMode(-2); fetchAddresses(); }} />
                  </div>}
                  {addresses.map((address, index) => (
                    editMode == index ? (
                      <div key={address.id} className="border border-[#D2B48C] rounded-lg p-6">
                        <h3 className="font-medium text-[#8B5A2B] mb-4">Edit Address</h3>
                        <AddressForm address={address} onCancel={() => setEditMode(-2)} onSubmit={(data) => { setEditMode(-2); fetchAddresses(); setAddresses([...addresses.slice(0, index), data, ...addresses.slice(index + 1)]); }} />
                      </div>
                    ) : (
                      <div
                        key={address.id}
                        className={`my-3 border rounded-lg p-4 ${address.isDefault ? "border-[#8B5A2B]" : "border-gray-200"}`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium">{address.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-2">{`${address.building}, ${address.street}${address.landmark ? ', ' : ''}${address.landmark ?? ''}`}</p>
                        <p className="text-sm text-gray-600 mt-2">{`${address.locality}, ${address.city}, ${address.state}, ${address.pin}`}</p>
                        {editMode < -1 && <div className="mt-4 flex gap-2">
                          <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B]" onClick={() => setEditMode(index)}>
                            Edit
                          </Button>
                          <Button variant="outline" className="border-gray-300">
                            Remove
                          </Button>
                        </div>}
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {/* {activeTab === "notifications" && (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}