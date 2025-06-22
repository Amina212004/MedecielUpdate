import React from 'react'
import { TbPassword } from "react-icons/tb"
import backgroundImage from '../assets/ResetPassword1.png';

import logo from "../assets/LOgo.svg";

const  Code = ()=>{
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
            <h1 className="text-3xl md:text-5xl font-bold text-[#002C4E]">Check Your Email</h1>
            <p className="text-sm md:text-2xl font-regular text-[#002C4E] mt-11 max-w-3xl">
             We’ve sent a verification code to your email. Please enter it below to continue.
            </p>
          </div>
        </header>
  
        {/* Email input section (positionné en bas à gauche) */}
     <div className="absolute bottom-40 left-10 w-[75%] max-w-7xl p-10 rounded-2xl h-[450px] flex flex-col">
  {/* Label + Icon */}
  <div className="flex items-center gap-6 mb-8">
    <div className="bg-white border border-teal-500 rounded-full p-3">
      <TbPassword className="text-teal-600 text-2xl" />
    </div>
    <label htmlFor="code" className="text-[28px] font-medium text-[#002C4E]">
      Code
    </label>
  </div>

  {/* 6 Inputs for code */}
  <div className="flex gap-6">
    {[...Array(6)].map((_, index) => (
      <input
        key={index}
        type="text"
        maxLength="1"
        className="w-20 h-24 text-center text-[24px] border-2 border-[#002C4E] rounded-lg text-[#002C4E] font-semibold focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
    ))}
  </div>

  {/* Button aligné en bas */}
  <div className="mt-auto">
    <button className="w-[300px] border-[2px] border-[#002C4E] bg-white text-[#002C4E] text-[19px] font-semibold py-5 px-3 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105">
      Continue
    </button>
  </div>
</div>

  
      </div>
    );
}

export default Code