import logo from "../assets/LOgo.svg"
import illustration from '../assets/illustrator.svg'
import backgroundImage from '../assets/login.svg'

const LoginPage = () => {
  return (
  
<div
  className="min-h-screen w-full flex bg-cover bg-center"
  style={{
    backgroundImage: `url(${backgroundImage})`,
  }}
>
  {/* ➤ CONTENU à gauche */}
<div className="w-[50%] h-screen bg-white rounded-tr-[100px] rounded-br-[100px] flex -  ">
      <form className="w-full h-full flex flex-col justify-center ml-24">
        {/* Titre très grand */}
        <h2 className="text-5xl font-bold text-teal-700 mb-16 ">Login</h2>

        {/* Champ Email */}
        <div className="mb-10">
          <input
            type="email"
            placeholder="Email"
           className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[22px] placeholder:text-[22px] placeholder-gray-500 focus:outline-none py-4 px-2"
          />
        </div>

        {/* Champ Password */}
        <div className="mb-10">
          <input
            type="password"
            placeholder="Password"
            className="w-full border-b-2 border-teal-400 focus:border-teal-600 text-[22px] placeholder:text-[22px] placeholder-gray-500 focus:outline-none py-4 px-2"
          />
        </div>

        {/* Checkbox + lien mot de passe oublié */}
       <div className="flex justify-between items-center text-[18px] text-gray-700 mt-6 mb-10">
         <label className="flex items-center">
          <input type="checkbox" className="accent-teal-500 mr-2 w-4 h-4 text-[18px] font-semibold " />
            Remember me
          </label>
         <a href="#" className="text-teal-500 hover:underline text-[18px]">Forget Password ?</a>
       </div>

        {/* Bouton de connexion */}
       <div className="flex justify-center">
          <button
           type="submit"
          className="w-[550px] bg-teal-500 hover:bg-teal-600 text-white font-semibold px-[10px] py-[20px] rounded-full text-[20px] transition-all"
          >
          Sign in
         </button>
       </div>

        {/* Lien vers l'inscription */}
        <p className="mt-12 text-center text-gray-700 text-[19px] font-semibold">
           Don’t have an account?{" "}
           <button className="text-teal-500 font-semibold hover:underline">Sign up</button>
        </p>
      </form>
     
    </div>
       

  {/* ➤ HEADER à droite */}
  <header className="w-[50%] flex items-start justify-end px-8 py-6">
    <img src={logo} alt="Logo" className="h-16" />
  </header>
</div>


  )
}

export default LoginPage;
