import logo from "../assets/LOgo.svg"
import illustration from '../assets/illustrator.svg'
import backgroundImage from '../assets/login.svg'
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [emailError, setEmailError] = useState("");
   const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const validateEmail = (email) => {
    const regex = /^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  let valid = true;

  // Validation de l'email
  if (!validateEmail(email)) {
    setEmailError("Format requis : abc.prenom@esi-sba.dz (abc = 1 à 3 lettres)");
    valid = false;
  } else {
    setEmailError("");
  }

  // Validation du mot de passe
  if (password.length < 8) {
    setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
    valid = false;
  } else {
    setPasswordError("");
  }

  if (valid) {
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const data = await response.json();

      // Enregistrer le token (ou autre info renvoyée par l'API)
      localStorage.setItem("token", data.token);  // change 'token' selon ta réponse backend

      // Rediriger vers une page protégée après login
      navigate("/ADDUser");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      alert("Échec de la connexion. Vérifie tes identifiants.");
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
      {/* ➤ CONTENU à gauche */}
      <div className="w-[50%] h-screen bg-white rounded-tr-[100px] rounded-br-[100px] flex">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center ml-24"
        >
          <h2 className="text-5xl font-bold text-teal-700 mb-16">Login</h2>

          {/* Email */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[22px] placeholder:text-[22px] placeholder-gray-500 focus:outline-none py-4 px-2"
            />
            {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[22px] placeholder:text-[22px] placeholder-gray-500 focus:outline-none py-4 px-2"
            />
            {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Checkbox + lien */}
          <div className="flex justify-between items-center text-[18px] text-gray-700 mt-6 mb-10">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="accent-teal-500 mr-2 w-4 h-4 text-[18px] font-semibold"
              />
              Remember me
            </label>
            <a href="#" className="text-teal-500 hover:underline text-[18px]"
              onClick={(e) => {
              e.preventDefault(); // Empêche le comportement par défaut du lien
              navigate("/forgotpassword"); }}>
              Forget Password ?
            </a>
          </div>

          {/* Bouton */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[550px] bg-teal-500 hover:bg-teal-600 text-white font-semibold px-[10px] py-[20px] rounded-full text-[20px] transition-all"
            >
              Sign in
            </button>
          </div>

          {/* Lien vers inscription */}
          <p className="mt-12 text-center text-gray-700 text-[19px] font-semibold">
            Don’t have an account?{" "}
            <button className="text-teal-500 font-semibold hover:underline" onClick={() => navigate("/signup")}>
              Sign up
            </button>
          </p>
        </form>
      </div>

      {/* ➤ HEADER à droite */}
      <header className="w-[50%] flex items-start justify-end px-8 py-6">
        <img src={logo} alt="Logo" className="h-16" />
      </header>
    </div>
  );
}

export default LoginPage;
