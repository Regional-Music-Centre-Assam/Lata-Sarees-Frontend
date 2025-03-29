"use client"

import { useState } from "react";
import { User, Mail, Phone, Calendar, MapPin, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Input } from "./ui/Input";

export function EditProfileSection() {
  const [profileData, setProfileData] = useState({
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    dob: "1990-05-15",
    gender: "female",
    avatar: "/path/to/avatar.jpg"
  });
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic
    setIsEditing(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic
    setIsPasswordEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData(prev => ({
          ...prev,
          avatar: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#3E2723]">Profile Information</h2>
        {!isEditing && (
          <Button 
            variant="outline" 
            className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F5F5DC]"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 border-2 border-[#8B5A2B]">
                <AvatarImage src={profileData.avatar} />
                <AvatarFallback className="bg-[#D2B48C] text-[#3E2723] text-2xl">
                  {profileData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload"
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-white text-sm text-center">Change Photo</span>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">Click on avatar to change</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                className="pl-10"
                value={profileData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="pl-10"
                value={profileData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="pl-10"
                value={profileData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
              <Input
                type="date"
                name="dob"
                className="pl-10"
                value={profileData.dob}
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
              <select
                name="gender"
                className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 h-10 text-sm"
                value={profileData.gender}
                onChange={handleInputChange}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              className="border-gray-300"
              onClick={() => setIsEditing(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#8B5A2B] hover:bg-[#A0522D]">
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 border-2 border-[#8B5A2B] mr-4">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback className="bg-[#D2B48C] text-[#3E2723] text-xl">
                {profileData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{profileData.name}</h3>
              <p className="text-sm text-gray-500">Member since 2022</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-[#8B5A2B] mr-2" />
                <span className="font-medium">Email:</span>
                <span className="ml-2 text-gray-600">{profileData.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-[#8B5A2B] mr-2" />
                <span className="font-medium">Phone:</span>
                <span className="ml-2 text-gray-600">{profileData.phone}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-[#8B5A2B] mr-2" />
                <span className="font-medium">Date of Birth:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(profileData.dob).toLocaleDateString('en-IN')}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 text-[#8B5A2B] mr-2" />
                <span className="font-medium">Gender:</span>
                <span className="ml-2 text-gray-600 capitalize">{profileData.gender}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#3E2723]">Password & Security</h2>
          {!isPasswordEditing && (
            <Button 
              variant="outline" 
              className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F5F5DC]"
              onClick={() => setIsPasswordEditing(true)}
            >
              Change Password
            </Button>
          )}
        </div>

        {isPasswordEditing ? (
          <form onSubmit={handlePasswordSubmit} className="max-w-md">
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className="pl-10"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="pl-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#8B5A2B]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                className="border-gray-300"
                onClick={() => setIsPasswordEditing(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#8B5A2B] hover:bg-[#A0522D]">
                Update Password
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex items-center text-sm">
            <Lock className="h-4 w-4 text-[#8B5A2B] mr-2" />
            <span className="text-gray-600">Last changed 3 months ago</span>
          </div>
        )}
      </div>

      {/* Account Actions */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold text-[#3E2723] mb-4">Account Actions</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700">
            Download Personal Data
          </Button>
          <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700">
            Request Account Deletion
          </Button>
          <Button variant="outline" className="w-full justify-start border-rose-100 text-rose-600 bg-rose-50 hover:bg-rose-100">
            Deactivate Account
          </Button>
        </div>
      </div>
    </div>
  );
}