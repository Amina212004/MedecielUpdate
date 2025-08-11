import logo from "../assets/logo.svg";

const Header = ({ firstName, lastName, role, image, initials }) => {
  console.log('Header Props:', { firstName, lastName, role, image, initials });

  return (
    <header
      className="fixed top-0 left-0 w-full flex justify-between items-center px-6 bg-white z-50"
      style={{ height: "150px" }}
    >
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-28" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-[110px] h-[110px] p-[2px] rounded-full bg-gradient-to-r from-[#165E72] to-[#95BFC3] flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-[106px] h-[106px] rounded-full object-cover bg-white"
            />
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${initials}&background=1B9C92&color=fff&size=128`}
              alt="Profile initials"
              className="w-[106px] h-[106px] rounded-full object-cover"
            />
          )}
        </div>
        <div className="text-right w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
          <p className="font-semibold text-[#002C4E] text-[20px]">
            {firstName} {lastName}
          </p>
          <p className="text-[16px] text-gray-500 text-center">{role}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;