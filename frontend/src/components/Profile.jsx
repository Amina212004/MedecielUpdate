import React, { useEffect, useState } from "react";
import Sidebar from "./AdminSideBare";
import Header from "./Header";
import axios from "axios";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
        setUser(response.data);
      } catch (error) {
        console.error("Erreur de récupération du profil :", error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <div>Chargement du profil...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <Header />

        <div
          className="flex-1 flex ml-[320px] mt-[160px] mr-[60px] mb-[30px] border"
          style={{
            width: "calc(100vw - 320px - 60px)",
            height: "calc(100vh - 160px - 30px)",
            border: "3px solid #1B9C92",
            boxShadow: "0 6px 12px rgba(154, 224, 219, 0.5)",
            borderRadius: "13px",
            overflow: "hidden",
          }}
        >
          <div className="p-6 flex flex-col justify-center  w-full h-full">
            <div className="mb-8 flex items-start gap-6">
  {/* Photo ou initiales + Change photo */}
  <div className="flex flex-col items-start">
    {user.photo ? (
      <img
        src={user.photo}
        alt="User"
        className="w-64 h-64 rounded-full border-4 border-teal-400 object-cover"
      />
    ) : (
      <div className="w-64 h-64 rounded-full bg-teal-500 text-white flex items-center justify-center text-5xl font-semibold border-4 border-teal-400">
        {user.first_name?.charAt(0).toUpperCase()}
        {user.last_name?.charAt(0).toUpperCase()}
      </div>
    )}

    {/* Change photo sous l’image */}
    <p className="text-[18px] text-[#002C4E] mt-3 ml-14 cursor-pointer hover:underline">
      Change your photo
    </p>
  </div>

  {/* Infos utilisateur à droite de l’image */}
  <div className="flex flex-col justify-center mt-24">
    <h2 className="text-4xl font-semibold text-[#002C4E]">
      {user.first_name} {user.last_name}
    </h2>
    <p className="text-[#002C4E]/80 text-[20px] mt-2 text-center">{user.role}</p>
  </div>
</div>


            {/* Formulaire */}
            <form className="bg-white p-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="block text-[20px] text-[#002C4E] font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
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

              {/* Mot de passe avec affichage/masquage */}
              <div className="flex flex-col gap-2 relative">
                <label className="block text-[20px] text-[#002C4E] font-medium mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  defaultValue="********"
                  className="w-full px-4 py-2 border border-[#002C4E] rounded-md bg-gradient-to-r from-[#A0DBD5] to-[#BBE5E1] focus:outline-none h-[75px] text-[22px] text-[#002C4E] font-medium pr-12"
                />
                
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
