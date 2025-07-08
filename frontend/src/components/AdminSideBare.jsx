import { FaHome, FaUserMd, FaUserPlus, FaUser } from "react-icons/fa";
import { MdOutlineMedicalServices } from "react-icons/md";
import { RiInbox2Fill, RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminSideBare = () => {
  return (
    <aside
      className="fixed flex flex-col justify-between text-white"
      style={{
        width: "300px",
        marginTop: "150px",
        height: "calc(100vh - 150px)",
        borderTopRightRadius: "100px",
        backgroundImage:
          "linear-gradient(to bottom, #21A99E, #1EA89C, #A3C8CB)",
      }}
    >
      <nav className="flex flex-col gap-48 p-4 mt-8 text-lg">
        {/* Bloc 1 - Navigation principale */}
        <div className="flex flex-col gap-5 p-4 mt-8 text-lg">
          <Link
            to="/adminhome"
            className="flex items-center gap-3 hover:text-gray-200 font-semibold"
          >
            <FaHome className="text-[#BBFAF4]" /> Home
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 hover:text-gray-200 font-semibold"
          >
            <FaUserMd className="text-[#BBFAF4]" /> Patients
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 hover:text-gray-200 font-semibold"
          >
            <MdOutlineMedicalServices className="text-[#BBFAF4]" /> MedicalStaff
          </Link>

          <Link
            to="/validatepage"
            className="flex items-center gap-3 hover:text-gray-200 font-semibold"
          >
            <RiInbox2Fill className="text-[#BBFAF4]" /> Inbox
          </Link>
        </div>

        {/* Bloc 2 - Utilisateurs & profil */}
        <div className="flex flex-col gap-5 p-4 mt-8 text-lg">
          <Link
            to="/adduser"
            className="flex items-center gap-3 hover:text-gray-200 font-semibold"
          >
            <FaUserPlus className="text-[#BBFAF4]" /> Add new user
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 hover:text-gray-200 font-semibold"
          >
            <FaUser className="text-[#BBFAF4]" /> Profile
          </Link>
        </div>

        {/* Bloc 3 - Déconnexion */}
        <div className="p-4 mb-4 cursor-pointer flex items-center gap-3 hover:text-gray-200 font-semibold">
         <Link
            to="/"
            className="p-4 mb-4 cursor-pointer flex items-center gap-3 hover:text-gray-200 font-semibold"
          >
           <RiLogoutCircleLine className="text-[#BBFAF4]" /> Log out
         </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSideBare;
