import { Route, Routes } from "react-router-dom";
import ADDUser from "./components/ADDUser.jsx";
import AdminHome from './components/AdminHome.jsx';
import Code from './components/Code';
import ForgotPassword from './components/ForgotPassword';
import Login from "./components/Login";
import MedicalStaffs from "./components/MedicalStaffs.jsx";
import Reset from "./components/Reset";
import SignUp from "./components/SignUp";
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
        <Route path='/medicalstaffs' element={<MedicalStaffs/>} />
      </Routes> 
    
    </>
  )
}

export default App
