"use client"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Mail, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import prod_5 from "../assets/ls_logo_1.png";
import { Login, CreateUser, GetEmailOtp, SetPassword } from "../Api";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

AuthPage.propTypes = {
  fetchUser: PropTypes.func,
};
AuthPage.defaultProps = {
  fetchUser: () => { },
};

export function AuthPage({ fetchUser = () => { } }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    emailotp: "",
    password: "",
    first_name: "",
    last_name: ""
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const loginFormData = new FormData();
      loginFormData.append('email', formData.email);
      loginFormData.append('password', formData.password);
      
      const result = await Login({ data: loginFormData });
      
      if (result === 0) {
        toast.success("Login successful!");
        fetchUser();
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!showOtpField) {
        // First step - request OTP
        const otpFormData = new FormData();
        otpFormData.append('email', formData.email);
        
        await GetEmailOtp({ data: otpFormData });
        setShowOtpField(true);
        toast.success("OTP sent to your email!");
      } else {
        // Second step - complete registration
        const userFormData = new FormData();
        userFormData.append('email', formData.email);
        userFormData.append('phone', formData.phone);
        userFormData.append('first_name', formData.first_name);
        userFormData.append('last_name', formData.last_name);
        userFormData.append('emailotp', formData.emailotp);
        
        // Create user
        const createResult = await CreateUser({ data: userFormData });
        
        if (createResult === 0) {
          // Set password
          const passwordFormData = new FormData();
          passwordFormData.append('email', formData.email);
          passwordFormData.append('password', formData.password);
          
          await SetPassword({ data: passwordFormData });
          
          toast.success("Registration successful! Please login.");
          setIsLogin(true);
          setShowOtpField(false);
          setFormData({
            email: "",
            phone: "",
            emailotp: "",
            password: "",
            first_name: "",
            last_name: ""
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with logo */}
        <div className="bg-[#8B5A2B] p-6 text-center">
          <Link to="/" className="inline-flex items-center space-x-2">
            <img src={prod_5} alt="Lata Sarees" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">Lata Sarees</span>
          </Link>
          <h2 className="mt-2 text-white">
            {isLogin ? "Welcome back" : "Create an account"}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 font-medium ${isLogin ? "text-[#8B5A2B] border-b-2 border-[#8B5A2B]" : "text-gray-500"}`}
            onClick={() => {
              setIsLogin(true);
              setShowOtpField(false);
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-4 font-medium ${!isLogin ? "text-[#8B5A2B] border-b-2 border-[#8B5A2B]" : "text-gray-500"}`}
            onClick={() => {
              setIsLogin(false);
              setShowOtpField(false);
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="p-6 space-y-4">
          {!isLogin && !showOtpField && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
                  <Input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    className="pl-10"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    className="pl-10"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="pl-10"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {!isLogin && showOtpField && (
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
              <Input
                type="text"
                name="emailotp"
                placeholder="Enter OTP"
                className="pl-10"
                value={formData.emailotp}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              className="pl-10"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
            <Input
              type="password"
              name="password"
              placeholder={isLogin ? "Password" : "Create Password"}
              className="pl-10"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-[#A0522D] hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#8B5A2B] hover:bg-[#A0522D] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : isLogin ? (
              "Login"
            ) : showOtpField ? (
              "Complete Registration"
            ) : (
              "Send OTP"
            )}
          </Button>

          <div className="text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-[#8B5A2B] hover:underline"
                  onClick={() => {
                    setIsLogin(false);
                    setShowOtpField(false);
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-[#8B5A2B] hover:underline"
                  onClick={() => {
                    setIsLogin(true);
                    setShowOtpField(false);
                  }}
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/*<div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-gray-300"
              type="button"
              disabled={isLoading}
            >
              Google
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300"
              type="button"
              disabled={isLoading}
            >
              Facebook
            </Button>
          </div>*/}
        </form>
      </div>
    </div>
  );
}