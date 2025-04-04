"use client"

import { useEffect, useState } from "react";
import { User, Mail, Phone } from "lucide-react";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Input } from "./ui/Input";
import PropTypes from "prop-types";
import { GetEmailOtp, RetrieveUpdateProfile } from "../Api";
import toast from "react-hot-toast";

EditProfileSection.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      date_joined: PropTypes.string.isRequired,
    }).isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

export function EditProfileSection({ user, fetchUser }) {
  const [first_name, setFirstName] = useState(user.user.first_name || "");
  const [last_name, setLastName] = useState(user.user.last_name || "");
  const [email, setEmail] = useState(user.user.email || "");
  const [emailotp, setEmailOtp] = useState('');
  const [phone, setPhone] = useState(user.user.username || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      setFirstName(user.user.first_name || "");
      setLastName(user.user.last_name || "");
      setEmail(user.user.email || "");
      setEmailOtp('');
      setPhone(user.user.username || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const getEmailOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setCountdown(120);
    setSendingOtp(true);
    await GetEmailOtp({
      data: {
        email: email,
      },
      showToast: true,
    });
    setEmailOtp('');
    setSendingOtp(false);

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await RetrieveUpdateProfile({
      data: {
        first_name,
        last_name,
        email,
        emailotp,
        phone,
        avatar,
      },
      showToast: true,
    })
    fetchUser();
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
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
                <AvatarImage src={avatar} />
                <AvatarFallback className="bg-[#D2B48C] text-[#3E2723] text-2xl">
                  {first_name.charAt(0)}
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
                name="first_name"
                placeholder="First Name"
                className="pl-10"
                value={first_name}
                defaultValue={user.user.first_name}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={last_name}
                defaultValue={user.user.last_name}
                onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                defaultValue={user.user.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type='button' onClick={getEmailOtp} className="absolute right-0 top-0 text-[#8B5A2B]" disabled={sendingOtp || countdown > 0}>
                {sendingOtp
                  ? 'Sending Email...'
                  : countdown > 0
                    ? `Retry in ${countdown}s`
                    : 'Get OTP'}
              </Button>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[#8B5A2B]" />
              <Input
                type="number"
                name="emailotp"
                placeholder="Email OTP"
                className="pl-10"
                value={emailotp}
                defaultValue=""
                onChange={(e) => setEmailOtp(e.target.value)}
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
                value={phone}
                defaultValue={user.user.username}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="reset"
              variant="outline"
              className="border-gray-300"
              onClick={() => {setIsEditing(false); fetchUser(); }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#8B5A2B] hover:bg-[#A0522D]" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 border-2 border-[#8B5A2B] mr-4">
              <AvatarImage src={avatar} />
              <AvatarFallback className="bg-[#D2B48C] text-[#3E2723] text-xl">
                {first_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{`${first_name} ${last_name}`}</h3>
              <p className="text-sm text-gray-500">Member since {(new Date(user.user.date_joined)).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-[#8B5A2B] mr-2" />
                <span className="font-medium">Email:</span>
                <span className="ml-2 text-gray-600">{email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-[#8B5A2B] mr-2" />
                <span className="font-medium">Phone:</span>
                <span className="ml-2 text-gray-600">{phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Actions */}
      {/* <div className="mt-12 pt-8 border-t border-gray-200">
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
      </div> */}
    </div>
  );
}