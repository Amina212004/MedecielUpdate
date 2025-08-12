import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./AdminSideBare";
import Header from "./Header";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Stored token:", token);

      try {
        const response = await axios.get("http://localhost:8000/api/current-user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("ProfilePage API Response:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Clean up imagePreview URL to avoid memory leaks
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Prepare profile update data
    const formData = new FormData(e.target);
    const profileData = new FormData();
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    let hasProfileChanges = false;

    if (firstName !== user.first_name || lastName !== user.last_name || photo) {
      profileData.append("first_name", firstName);
      profileData.append("last_name", lastName);
      if (photo) {
        console.log("Uploading image:", photo.name, photo.size, photo.type);
        profileData.append("img", photo);
      }
      hasProfileChanges = true;
    }

    try {
      const token = localStorage.getItem("token");
      const messages = [];

      // Update profile if there are changes
      if (hasProfileChanges) {
        const profileResponse = await axios.put(
          "http://localhost:8000/api/profile/update/",
          profileData,
          {
            headers: {
              Authorization: `Token ${token}`,
              // Content-Type is set automatically for FormData
            },
          }
        );
        console.log("Profile Update Response:", profileResponse.data);
        const newImg = profileResponse.data.user.img ? `${profileResponse.data.user.img}?t=${new Date().getTime()}` : null;
        console.log("Setting user.img:", newImg);
        setUser({
          ...profileResponse.data.user,
          img: newImg,
        });
        messages.push(profileResponse.data.message);
      }

      // Update password if newPassword is provided
      if (newPassword) {
        if (!currentPassword) {
          setError("Current password is required to change the password");
          return;
        }
        const passwordResponse = await axios.post(
          "http://localhost:8000/api/change-password/",
          {
            current_password: currentPassword,
            new_password: newPassword,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        messages.push(passwordResponse.data.message);
        setCurrentPassword("");
        setNewPassword("");
      }

      setPhoto(null);
      setImagePreview(null); // Clear preview after successful submission
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccess(messages.join(" | ") || "No changes made");
    } catch (error) {
      console.error("Error updating profile or password:", error.response?.data || error.message);
      setError(
        error.response?.data?.img?.[0] ||
        error.response?.data?.first_name?.[0] ||
        error.response?.data?.last_name?.[0] ||
        error.response?.data?.error ||
        "Failed to update profile or password. Please check your input."
      );
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name, file.size, file.type);
      if (!file.type.startsWith('image/')) {
        setError("Please upload a valid image file (jpg, png, etc.)");
        return;
      }
      setPhoto(file);
      // Generate a temporary URL for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  if (!user) return <div>Chargement du profil...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header
          firstName={user.first_name}
          lastName={user.last_name}
          role={user.role}
          image={imagePreview || user.img} // Use preview if available
          initials={user.initials}
        />
        <div
          className="flex-1 flex ml-[320px] mt-[160px] mr-[60px] mb-[30px] border "
          style={{
            width: "calc(100vw - 320px - 60px)",
            height: "calc(100vh - 160px - 30px)",
            border: "3px solid #1B9C92",
            boxShadow: "0 6px 12px rgba(154, 224, 219, 0.5)",
            borderRadius: "13px",
            overflow: "hidden",
          }}
        >
          <div className="p-6 flex flex-col justify-center w-full h-full">
            {success && <p className="text-green-600 text-lg mb-4">{success}</p>}
            {error && <p className="text-red-600 text-lg mb-4">{error}</p>}
            <div className=" flex items-start gap-6 ">
              <div className="flex flex-col items-start">
                {imagePreview || user.img ? (
                  <img
                    src={imagePreview || user.img} // Use preview if available
                    alt="User"
                    className="w-56 h-56 rounded-full border-4 border-teal-400 object-cover"
                    onError={(e) => {
                      console.error("Failed to load image:", imagePreview || user.img);
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-56 h-56 rounded-full bg-teal-500 text-white flex items-center justify-center text-5xl font-semibold border-4 border-teal-400">
                    {user.first_name?.charAt(0).toUpperCase()}
                    {user.last_name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <label className="text-[18px] text-[#002C4E] mt-3 ml-14 cursor-pointer hover:underline">
                  Change your photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </label>
              </div>
              <div className="flex flex-col justify-center mt-24">
                <h2 className="text-4xl font-semibold text-[#002C4E]">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-[#002C4E]/80 text-[20px] mt-2 text-center">
                  {user.role}
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              <div className="flex flex-col gap-2">
                <label className="block text-[20px] text-[#002C4E] font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  defaultValue={user.first_name}
                  className="w-full px-4 py-2 border border-[#002C4E] rounded-md bg-gradient-to-r from-[#A0DBD5] to-[#BBE5E1] focus:outline-none h-[75px] text-[22px] text-[#002C4E] font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-[20px] text-[#002C4E] font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  defaultValue={user.last_name}
                  className="w-full px-4 py-2 border border-[#002C4E] rounded-md bg-gradient-to-r from-[#A0DBD5] to-[#BBE5E1] focus:outline-none h-[75px] text-[22px] text-[#002C4E] font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-[20px] text-[#002C4E] font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2 border border-[#002C4E] rounded-md bg-gradient-to-r from-[#A0DBD5] to-[#BBE5E1] focus:outline-none h-[75px] text-[22px] text-[#002C4E] font-medium"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="block text-[20px] text-[#002C4E] font-medium mb-1">
                  Current Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 border border-[#002C4E] rounded-md bg-gradient-to-r from-[#A0DBD5] to-[#BBE5E1] focus:outline-none h-[75px] text-[22px] text-[#002C4E] font-medium pr-12"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="block text-[20px] text-[#002C4E] font-medium mb-1">
                  New Password (Optional)
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (optional)"
                  className="w-full px-4 py-2 border border-[#002C4E] rounded-md bg-gradient-to-r from-[#A0DBD5] to-[#BBE5E1] focus:outline-none h-[75px] text-[22px] text-[#002C4E] font-medium pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[50px] text-[#002C4E]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="col-span-2 flex justify-center mt-10">
                <button
                  type="submit"
                  className="bg-[#39878E] text-white font-medium py-[15px] px-[10px] rounded-md shadow-[0_0_6px_2px_#BBFAF4] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_12px_4px_#BBFAF4] transition-transform duration-300 ease-in-out w-[250px] text-[20px]"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;