import React from 'react'
import Sidebar from './AdminSideBare' 
import Header from './Header'
import medecielLogo from '../assets/LOgo.svg'
const AdminHome =() => {
  return (
   <div className="flex flex-col h-screen">
       <Header />

       <div className="flex flex-1" style={{ width: "100vw", height: "100vh" }}>
          <Sidebar />
          <div
            className="flex-1 flex ml-[320px] mt-[160px] mr-[60px] mb-[30px] border"
            style={{
            width: "calc(100vh - 320px - 60px)",
            height: "calc(100vh - 160px - 30px)",
            border: "3px solid #1B9C92",
            boxShadow: "0 6px 12px rgba(154, 224, 219, 0.5)",
            borderRadius: "13px",
            overflow: "hidden",
          }}> 
          <div className="flex-1 flex flex-col p-8 overflow-auto bg-white rounded-[10px] gap-20">
  {/* Message de bienvenue */}
  <div className="bg-[#4AACA8] text-white rounded-xl p-6 mb-10 flex justify-between items-center shadow-md h-[200px]"
      style={{ boxShadow: "0 6px 12px rgba(181, 228, 224, 0.9)" }}>
            <div>
              <h2 className="text-[30px] font-bold mb-2">Hello Mohamed Amin, welcome back to the platform.</h2>
              <p className="text-[20px]">
                You can now manage users, oversee system activity, and ensure everything runs smoothly. Have a great day!
              </p>
           </div>
           <div className="text-right text-3xl font-bold italic text-[#054350] flex-[0.3] items-center ">
             <img
               src={medecielLogo}
               alt="Medeciel Logo"
               className="h-full w-full object-contain"
              />
            </div>
    </div>

  {/* Recently Added */}
  <div>
    <h3 className="text-[30px] font-bold  text-[#086972] mb-6 border-b-2 border-[#002C4E] inline-block">Recently Added</h3>
    
    <table className="w-full table-auto text-left" style={{borderRadius : "13px" , }}>
      <thead>
        <tr className="text-teal-700 font-semibold border-b-2 border-gray-300 h-[20px] ">
          <th className="py-2  text-[20px] " >Name</th>
          <th className="py-2  text-[20px] ">Email</th>
          <th className="py-2  text-[20px] ">Role</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: "Fezazi Amina Khadidja", email: "ak.fezazi@esi-sba.dz", role: "Doctor", img: "https://randomuser.me/api/portraits/women/44.jpg" },
          { name: "Fezazi Amina Khadidja", email: "ak.fezazi@esi-sba.dz", role: "Patient", img: "https://randomuser.me/api/portraits/women/47.jpg" },
          { name: "Fezazi Amina Khadidja", email: "ak.fezazi@esi-sba.dz", role: "Assistant-Doctor", img: "https://randomuser.me/api/portraits/women/50.jpg" },
          { name: "Fezazi Amina Khadidja", email: "ak.fezazi@esi-sba.dz", role: "Doctor", img: "https://randomuser.me/api/portraits/women/55.jpg" },
        ].map((user, index) => (
          <tr key={index} className="py-4 px-4 border-[3px] border-[#002C4E] hover:bg-gray-50 h-[100px] text-[20px] text-[##002C4E] "
          >
            <td className="py-4 flex items-center gap-4 p-5 mt-5" >
              <img src={user.img} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
              <span>{user.name}</span>
            </td>
            <td className="py-4 text-teal-700 font-medium ">{user.email}</td>
            <td className="py-4">{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>  </div>
      </div>
    </div>
  )
}

export default AdminHome