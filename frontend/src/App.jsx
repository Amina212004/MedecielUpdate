import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Reset from "./components/Reset"
import SignUp from "./components/SignUp"
import ForgotPassword from './components/ForgotPassword'
import Code from './components/Code'


function App() {
 

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/code" element={<Code/>} />
        <Route path="/reset" element={<Reset/>} />
      </Routes>
    </Router>
  )
}

export default App
