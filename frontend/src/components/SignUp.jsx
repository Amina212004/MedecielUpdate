import React from 'react'
import logo from "../assets/LOgo.svg"
import illustration from '../assets/illustrator.svg'
import backgroundImage from '../assets/SignUp.svg'
const SignUp = () => {
  return (
<div
  className="min-h-screen w-full flex bg-cover bg-center"
  style={{
    backgroundImage: `url(${backgroundImage})`,
  }}
>
  {/* ➤ HEADER à gauche */}
  <header className="w-[50%] flex items-start justify-start px-8 py-6">
    <img src={logo} alt="Logo" className="h-16" />
  </header>

  {/* ➤ CONTENU à droite */}
  <div className="w-[50%] h-screen bg-white rounded-tl-[100px] rounded-bl-[100px] flex">
    <form className="w-full h-full flex flex-col justify-center -ml-20">
      {/* Titre très grand */}
      <h2 className="text-5xl font-bold text-teal-700 mb-14">Create Account</h2>

      {/* Champs First Name + Last Name côte à côte */}
      <div className="flex gap-6 mb-8">
        <input
          type="text"
          placeholder="First Name"
          className="w-1/2 border-b-2 border-teal-400 focus:border-teal-600 text-[20px] placeholder:text-[20px] placeholder-gray-500 focus:outline-none py-3 px-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-1/2 border-b-2 border-teal-400 focus:border-teal-600 text-[20px] placeholder:text-[20px] placeholder-gray-500 focus:outline-none py-3 px-2"
        />
      </div>

      {/* Champ Email */}
      <div className="mb-8">
        <input
          type="email"
          placeholder="Email"
          className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[20px] placeholder:text-[20px] placeholder-gray-500 focus:outline-none py-3 px-2"
        />
      </div>

      {/* Champ Password */}
      <div className="mb-8">
        <input
          type="password"
          placeholder="Password"
          className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[20px] placeholder:text-[20px] placeholder-gray-500 focus:outline-none py-3 px-2"
        />
      </div>

      {/* Choix du rôle */}
      <div className="flex justify-center mb-10">
  <div className="flex items-center gap-12 text-gray-700 text-[22px] font-medium">
    <label className="flex items-center gap-2">
      <input type="radio" name="role" className="accent-teal-500 w-5 h-5" />
      Student
    </label>
    <label className="flex items-center gap-2">
      <input type="radio" name="role" className="accent-teal-500 w-5 h-5" />
      Teacher
    </label>
    <label className="flex items-center gap-2">
      <input type="radio" name="role" className="accent-teal-500 w-5 h-5" />
      ATS
    </label>
  </div>
</div>

      {/* Bouton */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[550px] bg-teal-500 hover:bg-teal-600 text-white font-semibold px-[10px] py-[20px] rounded-full text-[20px] transition-all"
        >
          Create Account
        </button>
      </div>

      {/* Lien vers connexion */}
      <p className="mt-12 text-center text-gray-700 text-[19px] font-semibold">
        Already have an account?{" "}
        <button className="text-teal-500 font-semibold hover:underline">Login</button>
      </p>
    </form>
  </div>
</div>



  )
}

export default SignUp