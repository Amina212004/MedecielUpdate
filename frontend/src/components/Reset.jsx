import React, { useState } from 'react';
import { IoMdLock } from "react-icons/io";
import backgroundImage from '../assets/ResetPassword1.png';
import logo from "../assets/LOgo.svg";
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const handleReset = () => {
    // Vérifier longueur du mot de passe
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    // Vérifier si les deux mots de passe sont identiques
    if (newPassword !== confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }

    // Si tout est bon
    alert('Password reset successful!');
    navigate('/');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);

    // Comparaison en temps réel dès le 1er caractère
    if (newPassword.startsWith(e.target.value) || e.target.value === '') {
      setConfirmError('');
    } else {
      setConfirmError('Passwords do not match');
    }
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
          <h1 className="text-3xl md:text-5xl font-bold text-[#002C4E]">Reset Your Password</h1>
          <p className="text-sm md:text-2xl font-regular text-[#002C4E] mt-11 max-w-3xl">
            Please enter a new password and confirm it below.
          </p>
        </div>
      </header>

      {/* Email input section */}
      <div className="absolute bottom-40 left-10 w-[75%] max-w-7xl p-10 rounded-2xl h-[500px] flex flex-col">
        
        {/* New Password */}
        <div className="flex items-center gap-6 mb-4">
          <div className="bg-white border border-teal-500 rounded-full p-3">
            <IoMdLock className="text-teal-600 text-2xl" />
          </div>
          <label htmlFor="new-password" className="text-[28px] font-medium text-[#002C4E]">
            New Password
          </label>
        </div>

        <input
          type="password"
          id="new-password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="w-3/4 mb-2 px-5 py-3 rounded-lg text-[#002C4E] text-[18px] font-medium border-[2px] border-[#002C4E] focus:outline-none focus:ring-2 focus:ring-teal-300 h-16 placeholder:text-[20px]"
        />
        {passwordError && <p className="text-red-600 text-[16px] mb-2">{passwordError}</p>}

        {/* Confirm Password */}
        <div className="flex items-center gap-6 mt-4">
          <div className="bg-white border border-teal-500 rounded-full p-3 mb-4">
            <IoMdLock className="text-teal-600 text-2xl" />
          </div>
          <label htmlFor="confirm-password" className="text-[28px] font-medium text-[#002C4E]">
            Confirm Password
          </label>
        </div>

        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-3/4 px-5 py-3 rounded-lg text-[#002C4E] text-[18px] font-medium border-[2px] border-[#002C4E] focus:outline-none focus:ring-2 focus:ring-teal-300 h-16 placeholder:text-[20px]"
        />
        {confirmError && <p className="text-red-600 text-[16px]">{confirmError}</p>}

        {/* Buttons */}
        <div className="mt-auto flex items-center justify-between w-[75%]">
          <button
            onClick={() => navigate("/")}
            className="text-[#002C4E] text-[20px] font-medium transition duration-300 ease-in-out hover:underline hover:text-white"
          >
            Back to Login
          </button>

          <button
            onClick={handleReset}
            className="w-[300px] border-[2px] border-[#002C4E] bg-white text-[#002C4E] text-[19px] font-semibold py-5 px-3 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reset;
