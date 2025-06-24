import { TbPassword } from "react-icons/tb";
import backgroundImage from '../assets/ResetPassword1.png';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import logo from "../assets/LOgo.svg";

const Code = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Header */}
      <header className="w-full flex items-start justify-between px-8 py-6 
                        2xl:px-12 2xl:py-8 
                        lg-max-900:px-6 lg-max-900:py-4
                        md-max-700:px-4 md-max-700:py-3">
        <img src={logo} alt="Logo" className="h-16 mt-3 
                        2xl:h-20 2xl:mt-4
                        lg-max-900:h-14 lg-max-900:mt-2
                        md-max-700:h-12 md-max-700:mt-1" />
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center mt-3
                        2xl:top-8 2xl:mt-4
                        lg-max-900:top-5 lg-max-900:mt-2
                        md-max-700:top-4 md-max-700:mt-1">
          <h1 className="text-3xl md:text-5xl font-bold text-[#002C4E]
                         2xl:text-6xl
                         lg-max-900:text-4xl
                         md-max-700:text-2xl">
            Check Your Email
          </h1>
          <p className="text-sm md:text-2xl font-regular text-[#002C4E] mt-11 max-w-3xl
                       2xl:text-3xl 2xl:mt-14 2xl:max-w-4xl
                       lg-max-900:text-xl lg-max-900:mt-8 lg-max-900:max-w-2xl
                       md-max-700:text-base md-max-700:mt-6 md-max-700:max-w-md">
            We've sent a verification code to your email. Please enter it below to continue.
          </p>
        </div>
      </header>

      {/* Email input section */}
      <div className="absolute bottom-40 left-10 w-[75%] max-w-7xl p-10 rounded-2xl h-[450px] flex flex-col
                      2xl:bottom-48 2xl:left-12 2xl:w-[80%] 2xl:p-12 2xl:h-[500px]
                      lg-max-900:bottom-32 lg-max-900:left-8 lg-max-900:w-[80%] lg-max-900:p-8 lg-max-900:h-[400px]
                      md-max-700:bottom-24 md-max-700:left-4 md-max-700:w-[85%] md-max-700:p-6 md-max-700:h-[350px]">
        {/* Label + Icon */}
        <div className="flex items-center gap-6 mb-8
                        2xl:gap-8 2xl:mb-10
                        lg-max-900:gap-5 lg-max-900:mb-6
                        md-max-700:gap-4 md-max-700:mb-4">
          <div className="bg-white border border-teal-500 rounded-full p-3
                          2xl:p-4
                          lg-max-900:p-2.5
                          md-max-700:p-2">
            <TbPassword className="text-teal-600 text-2xl
                                  2xl:text-3xl
                                  lg-max-900:text-xl
                                  md-max-700:text-lg" />
          </div>
          <label htmlFor="code" className="text-[28px] font-medium text-[#002C4E]
                                         2xl:text-[32px]
                                         lg-max-900:text-2xl
                                         md-max-700:text-xl">
            Code
          </label>
        </div>

        {/* 6 Inputs for code */}
        <div className="flex gap-6
                       2xl:gap-8
                       lg-max-900:gap-5
                       md-max-700:gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-20 h-24 text-center text-[24px] border-2 border-[#002C4E] rounded-lg text-[#002C4E] font-semibold focus:outline-none focus:ring-2 focus:ring-teal-300
                         2xl:w-24 2xl:h-28 2xl:text-[28px]
                         lg-max-900:w-16 lg-max-900:h-20 lg-max-900:text-xl
                         md-max-700:w-12 md-max-700:h-16 md-max-700:text-lg"
            />
          ))}
        </div>

        {/* Button and Back to Login */}
        <div className="mt-auto flex items-center justify-between w-[75%]
                        2xl:w-[80%]
                        lg-max-900:w-[80%]
                        md-max-700:w-[90%] md-max-700:flex-col md-max-700:gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-[#002C4E] text-[20px] font-medium transition duration-300 ease-in-out hover:underline hover:text-white
                       2xl:text-[22px]
                       lg-max-900:text-lg
                       md-max-700:text-base"
          >
            Back to Login
          </button>

          <button
            disabled={!isCodeComplete}
            onClick={() => navigate("/reset")}
            className={`w-[300px] border-[2px] border-[#002C4E] bg-white text-[#002C4E] text-[19px] font-semibold py-5 px-3 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${
              !isCodeComplete ? "opacity-50 cursor-not-allowed hover:shadow-none hover:scale-100" : ""
            }
                        2xl:w-[350px] 2xl:text-[21px] 2xl:py-6
                        lg-max-900:w-[250px] lg-max-900:text-lg lg-max-900:py-4
                        md-max-700:w-full md-max-700:text-base md-max-700:py-3`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Code;