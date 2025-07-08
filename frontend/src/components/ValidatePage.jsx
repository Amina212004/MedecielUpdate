import React from 'react'
import Sidebar from './AdminSideBare' 
import Header from './Header'
import { FaCheckCircle, FaTrash } from "react-icons/fa"; 

const ValidatePage = () => {
    const users = [
    { id: 1, firstName: "Amina", lastName: "Fezazi", email: "ak.fezazi@esi-sba.dz", role: "Student" },
    { id: 2, firstName: "Amina", lastName: "Fezazi", email: "ak.fezazi@esi-sba.dz", role: "Student" },
  ];

  const handleAccept = (id) => {
    console.log(`Utilisateur ${id} validé`);
    // Ici tu peux envoyer une requête à ton backend pour valider l'utilisateur
  };

  const handleDelete = (id) => {
    console.log(`Utilisateur ${id} supprimé`);
    // Ici tu peux envoyer une requête à ton backend pour supprimer l'utilisateur
  };
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
        <div className="flex flex-col w-full h-full overflow-auto p-4">
     

         <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow">
          <thead className="bg-teal-400 text-white">
          <tr    style={{
                 
                 border: "2px solid #002C4E",
                 
          }}>
            <th className="py-3 px-4 text-left font-semibold text-[20px] h-[20px]">First Name</th>
            <th className="py-3 px-4 text-left font-semibold text-[20px]">Last Name</th>
            <th className="py-3 px-4 text-left font-semibold text-[20px]">Email</th>
            <th className="py-3 px-4 text-left font-semibold text-[20px]">Role</th>
            <th className="py-3 px-4 text-center ont-semibold text-[20px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-100 "    style={{
                 
                 border: "2px solid #002C4E",
                 
          }}>
              <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px] h-[80px]"
             >{user.firstName}</td>
              <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px]">{user.lastName}</td>
              <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px]">{user.email}</td>
              <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px]">{user.role}</td>
              <td className="py-2 px-4 mt-7 flex justify-center items-center space-x-4">
                <FaCheckCircle 
                  className="text-green-500 hover:text-green-700 cursor-pointer text-xl" 
                  onClick={() => handleAccept(user.id)} 
                />
                <FaTrash 
                  className="text-red-500 hover:text-red-700 cursor-pointer text-xl" 
                  onClick={() => handleDelete(user.id)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

          </div>
       </div>
 </div>
  )
}

export default ValidatePage