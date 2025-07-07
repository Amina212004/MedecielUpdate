import logo from "../assets/logo.svg";

const Header = ({ firstName, lastName, role, image }) => {

  const getInitials = () => {
    if (!firstName || !lastName) return "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 bg-white z-50" style={{ height: "150px" }}>
      
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-28" />
      </div>

      {/* Profil */}
      <div className="flex items-center gap-4">
        
        {/* Avatar avec gradient */}
        <div className="w-[110px] h-[110px] p-[2px] rounded-full bg-gradient-to-r from-[#165E72] to-[#95BFC3] flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-[106px] h-[106px] rounded-full object-cover bg-white"
            />
          ) : (
            <div className="w-[106px] h-[106px] flex items-center justify-center rounded-full bg-white text-white font-bold text-3xl">
              {getInitials()}
            </div>
          )}
        </div>

        {/* Informations */}
        <div className="text-right w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
          <p className="font-semibold text-[#002C4E] text-[20px]">Fezazi Amina</p>
          <p className="text-[16px] text-gray-500 text-center">Admin Manager</p>
        </div>
        
      </div>

    </header>
  );
};

export default Header;
