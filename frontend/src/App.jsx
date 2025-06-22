import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Reset from "./components/Reset"
import SignUp from "./components/SignUp"


function App() {
 

  return (
   <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
