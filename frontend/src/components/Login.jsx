import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOgo.svg";
import backgroundImage from '../assets/login.svg';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (email === "medeciels@gmail.com") {
      return true;
    }
    const regex = /^[a-z]{1,3}\.[a-z]+@esi-sba\.dz$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Format requis : abc.prenom@esi-sba.dz (abc = 1 à 3 lettres) ou medeciels@gmail.com pour l'admin");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (email !== "medeciels@gmail.com" && password.length < 8) {
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Email ou mot de passe incorrect");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        console.log("Stored token:", data.token);

        // Redirect based on role
        if (data.redirect === "adminhome") {
          navigate("/adminhome");
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error.message);
        alert(`Échec de la connexion: ${error.message}`);
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
      <div className="w-[50%] h-screen bg-white rounded-tr-[100px] rounded-br-[100px] flex">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center ml-24"
        >
          <h2 className="text-5xl font-bold text-teal-700 mb-16">Login</h2>
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
          <div className="flex justify-between items-center text-[18px] text-gray-700 mt-6 mb-10">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="accent-teal-500 mr-2 w-4 h-4 text-[18px] font-semibold"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-teal-500 hover:underline text-[18px]"
              onClick={(e) => {
                e.preventDefault();
                navigate("/forgotpassword");
              }}
            >
              Forget Password ?
            </a>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[550px] bg-teal-500 hover:bg-teal-600 text-white font-semibold px-[10px] py-[20px] rounded-full text-[20px] transition-all"
            >
              Sign in
            </button>
          </div>
          <p className="mt-12 text-center text-gray-700 text-[19px] font-semibold">
            Don’t have an account?{" "}
            <button
              className="text-teal-500 font-semibold hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
      <header className="w-[50%] flex items-start justify-end px-8 py-6">
        <img src={logo} alt="Logo" className="h-16" />
      </header>
    </div>
  );
};

export default LoginPage;