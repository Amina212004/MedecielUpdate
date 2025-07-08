import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Reset from "./components/Reset"
import SignUp from "./components/SignUp"
import ForgotPassword from './components/ForgotPassword'
import Code from './components/Code'
import AdminHome from './components/AdminHome.jsx'
import ADDUser from "./components/ADDUser.jsx";
import ValidatePage from "./components/ValidatePage.jsx";


function App() {
 

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/code" element={<Code/>} />
        <Route path="/reset" element={<Reset/>} />
        <Route path='/adduser' element={<ADDUser/>} />
        <Route path='/validatepage' element={<ValidatePage/>} />
        <Route path='/adminhome' element={<AdminHome/>} />
      </Routes> 
    
    </>
  )
}

export default App
