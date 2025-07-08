import React from 'react'
import logo from "../assets/LOgo.svg"
import illustration from '../assets/illustrator.svg'
import backgroundImage from '../assets/SignUp.svg'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
   const navigate = useNavigate();
  const [errors, setErrors] = useState({});
    const validate = () => {
    const newErrors = {};

    // Prénom
    if (!/^[A-Za-z]+$/.test(firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }

    // Nom
    if (!/^[A-Za-z]+$/.test(lastName)) {
      newErrors.lastName = "Last name must contain only letters";
    }

    // Email
    if (!/^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$/.test(email)) {
      newErrors.email = "Email must be in the format abc.prenom@esi-sba.dz";
    }

    // Password
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Role
    if (!role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          role: role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur :", errorData);
        alert("Erreur lors de l'envoi de la demande !");
        return;
      }

      alert("Demande envoyée avec succès ! En attente de validation par l'admin.");
      navigate("/");
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur de connexion au serveur.");
    }
  }
};



  return (
    <div
      className="min-h-screen w-full flex bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* HEADER à gauche */}
      <header className="w-[50%] flex items-start justify-start px-8 py-6">
        <img src={logo} alt="Logo" className="h-16" />
      </header>

      {/* FORMULAIRE à droite */}
      <div className="w-[50%] h-screen bg-white rounded-tl-[100px] rounded-bl-[100px] flex ">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center -ml-20 gap-6"
        >
          <h2 className="text-5xl font-bold text-teal-700 mb-14">Create Account</h2>

          {/* Nom & Prénom */}
          <div className="flex gap-6 mb-3">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (!/^[A-Za-z]*$/.test(e.target.value)) {
                    setErrors((prev) => ({
                      ...prev,
                      firstName: "First name must contain only letters",
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, firstName: "" }));
                  }
                }}
                className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[20px] py-3 px-2 placeholder:text-[20px] placeholder-gray-500 focus:outline-none"
              />
              {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (!/^[A-Za-z]*$/.test(e.target.value)) {
                    setErrors((prev) => ({
                      ...prev,
                      lastName: "Last name must contain only letters",
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, lastName: "" }));
                  }
                }}
                className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[20px] py-3 px-2 placeholder:text-[20px] placeholder-gray-500 focus:outline-none"
              />
              {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!/^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$/.test(e.target.value)) {
                  setErrors((prev) => ({
                    ...prev,
                    email: "Email must be in the format abc.prenom@esi-sba.dz",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
              className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[20px] py-3 px-2 placeholder:text-[20px] placeholder-gray-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length < 8) {
                  setErrors((prev) => ({
                    ...prev,
                    password: "Password must be at least 8 characters long",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
              className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[20px] py-3 px-2 placeholder:text-[20px] placeholder-gray-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Rôle */}
          <div className="flex justify-center mb-6 mt-4">
            <div className="flex items-center gap-12 text-gray-700 text-[22px] font-medium">
              {["Student", "Teacher", "ATS"].map((r) => (
                <label key={r} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={role === r}
                    onChange={(e) => {
                      setRole(e.target.value);
                      setErrors((prev) => ({ ...prev, role: "" }));
                    }}
                    className="accent-teal-500 w-5 h-5"
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>
          {errors.role && <p className="text-red-600 text-sm text-center mb-4">{errors.role}</p>}

          {/* Bouton */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[550px] bg-teal-500 hover:bg-teal-600 text-white font-semibold px-[10px] py-[20px] rounded-full text-[20px] transition-all"
            >
              Create Account
            </button>
          </div>

          {/* Lien vers login */}
          <p className="mt-12 text-center text-gray-700 text-[19px] font-semibold">
            Already have an account?{" "}
            <button className="text-teal-500 font-semibold hover:underline" onClick={() => navigate("/")}>Sign in </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp