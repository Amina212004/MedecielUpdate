import { FaHome, FaUserMd,  FaUserPlus, FaUser } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiInbox2Fill , RiLogoutCircleLine } from "react-icons/ri";

const AdminSideBare = () => {
  return (
    <aside
  className="fixed flex flex-col justify-between text-white "

  style={{
    width: "300px",
    marginTop: "150px",
   height: "calc(100vh - 150px)",
    borderTopRightRadius: "100px",
    backgroundImage: "linear-gradient(to bottom,   #21A99E ,#1EA89C , #A3C8CB  )"
  }}
>
     
        
        <nav className="flex flex-col  gap-48 p-4 mt-8 text-lg">
          <div className="flex flex-col gap-5 p-4 mt-8 text-lg" >
          <Link to="/" className="flex items-center gap-3 hover:text-gray-200 font-semibold">
            <FaHome  className="text-[#BBFAF4]" /> Home
          </Link>
          <Link to="/" className="flex items-center gap-3 hover:text-gray-200 font-semibold">
            <FaUserMd className="text-[#BBFAF4]" /> Patients
          </Link>
          <Link to="/" className="flex items-center gap-3 hover:text-gray-200 font-semibold">
            <MdOutlineMedicalServices className="text-[#BBFAF4]" /> MedicalStaff
          </Link>
          <Link to="/" className="flex items-center gap-3 hover:text-gray-200 font-semibold">
            <RiInbox2Fill className="text-[#BBFAF4]" /> Inbox
          </Link>
          </div>
          <div className="flex flex-col gap-5 p-4 mt-8 text-lg">
          <Link to="/" className="flex items-center gap-3 hover:text-gray-200 font-semibold">
            <FaUserPlus /> Add new user
          </Link>
          <Link to="/" className="flex items-center gap-3 hover:text-gray-200 font-semibold">
            <FaUser  className="text-[#BBFAF4]" /> Profile
          </Link>
          </div>
          <div className="p-4 mb-4 cursor-pointer flex items-center gap-3 hover:text-gray-200  font-semibold">
           <RiLogoutCircleLine className="text-[#BBFAF4]" /> Log out
        </div>
        </nav>
      
      
    </aside>
  );
};

export default AdminSideBare;
