
import backgroundImage from '../assets/ResetPassword1.png';
import { MdEmail } from "react-icons/md";
import logo from "../assets/LOgo.svg";
import { useNavigate } from "react-router-dom";
  import { useState } from 'react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Regex qui vérifie l'email selon ta règle
    const emailPattern = /^[a-zA-Z]{1,3}\.[a-zA-Z]+@esi-sba\.dz$/;

    setIsValid(emailPattern.test(value));
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Header */}
      <header className="w-full flex items-start justify-between px-8 py-6">
        <img src={logo} alt="Logo" className="h-16 mt-3" />
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center mt-3">
          <h1 className="text-3xl md:text-5xl font-bold text-[#002C4E]">Forgot Password</h1>
          <p className="text-sm md:text-2xl font-regular text-[#002C4E] mt-11 max-w-3xl">
            Please enter the email address associated with your account. We’ll send you a verification code to reset your password.
          </p>
        </div>
      </header>

      {/* Email input section (positionné en bas à gauche) */}
   <div className="absolute bottom-40 left-10 w-[75%] max-w-7xl p-10 rounded-2xl h-[450px] flex flex-col">
  {/* Label + Icon */}
  <div className="flex items-center gap-6 mb-8">
    <div className="bg-white border border-teal-500 rounded-full p-3">
      <MdEmail className="text-teal-600 text-2xl" />
    </div>
    <label htmlFor="email" className="text-[28px] font-medium text-[#002C4E]">
      Email
    </label>
  </div>

  {/* Input */}
  <input
    type="email"
    id="email"
    value={email}
    onChange={handleEmailChange}
    placeholder="Enter your email"
    className="w-3/4  px-5 py-3 rounded-lg text-[#002C4E] text-[18px] font-medium focus:outline-none focus:ring-2 focus:ring-teal-300 h-16 placeholder:text-[20px]"
  /> 
    {email.length > 0 && !isValid && (
        <p className="text-red-500 text-sm">Veuillez respecter le format : abc.prenom@esi-sba.dz</p>
      )}

  {/* Button aligné en bas */}
    <div className="mt-auto flex items-center justify-between w-[75%]">
    
    {/* Lien Back to Login */}
    <button
      onClick={() => navigate("/")}
      className="text-[#002C4E] text-[20px] font-medium transition duration-300 ease-in-out hover:underline   hover:text-white"
    >
      Back to Login
    </button>

    {/* Bouton Send Email */}
    <button
      disabled={!isValid}
      onClick={() => navigate("/code")}
      className={`w-[300px] border-[2px] border-[#002C4E] bg-white text-[#002C4E] text-[19px] font-semibold py-5 px-3 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 `}
    >
      Send Email
    </button>
  </div>
</div>

    </div>
  );
};

export default ForgotPassword;
