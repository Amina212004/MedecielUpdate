import { useState } from 'react';
import Header from './Header';
import Sidebar from './AdminSideBare';
import doctor from '../assets/Doctore.jpg';

const ADDUser = () => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    const regex = /^[a-zA-Z]{1,3}\.[a-zA-Z]+@esi-sba\.dz$/;
    return regex.test(value);
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Email must be in the form abc.prenom@esi-sba.dz";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters long";

    if (!role) newErrors.role = "Role is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      // Envoyer les données ici
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1" style={{ width: "100vw", height: "100vh" }}>
        <Sidebar />

        <div
          className="flex-1 flex ml-[320px] mt-[160px] mr-[60px] mb-[30px] border"
          style={{
            width: "calc(100vh - 320px - 60px)",
            height: "calc(100vh - 160px - 30px)",
            border: "3px solid #1B9C92",
            boxShadow: "0 6px 12px rgba(154, 224, 219, 0.5)",
            borderRadius: "13px",
            overflow: "hidden",
          }}
        >
          {/* Formulaire */}
          <div className="flex-[5] h-full p-6 space-y-6">

            {/* Last Name */}
            <div>
              <label className="block mb-2 font-semibold text-[22px] text-[#002C4E]">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded p-2"
                style={{
                  height: "70px",
                  outline: 'none',
                  padding: '5px 20px',
                  border: "3px solid #1B9C92",
                  borderRadius: "6px",
                  fontSize: "20px",
                  color: '#002C4E'
                }}
              />
              {errors.lastName && <p className="text-red-500 mt-1">{errors.lastName}</p>}
            </div>

            {/* First Name */}
            <div>
              <label className="block mb-2 font-semibold text-[22px] text-[#002C4E]">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded p-2"
                style={{
                  height: "70px",
                  outline: 'none',
                  padding: '5px 20px',
                  border: "3px solid #1B9C92",
                  borderRadius: "6px",
                  fontSize: "20px",
                  color: '#002C4E'
                }}
              />
              {errors.firstName && <p className="text-red-500 mt-1">{errors.firstName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[22px] text-[#002C4E] font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-2"
                style={{
                  height: "70px",
                  outline: 'none',
                  padding: '5px 20px',
                  border: "3px solid #1B9C92",
                  borderRadius: "6px",
                  fontSize: "20px",
                  color: '#002C4E'
                }}
              />
              {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[22px] text-[#002C4E] font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded p-2"
                style={{
                  height: "70px",
                  outline: 'none',
                  padding: '5px 20px',
                  border: "3px solid #1B9C92",
                  borderRadius: "6px",
                  fontSize: "20px",
                  color: '#002C4E'
                }}
              />
              {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-[22px] text-[#002C4E] font-semibold">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded p-2"
                style={{
                  height: "70px",
                  outline: 'none',
                  padding: '5px 20px',
                  border: "3px solid #1B9C92",
                  borderRadius: "6px",
                  fontSize: "20px",
                  color: '#002C4E',
                  textAlign: 'center'
                }}
              >
                <option value="">Select Role</option>
                <option>Doctor</option>
                <option>Assistant Doctor</option>
                <option>Director</option>
              </select>
              {errors.role && <p className="text-red-500 mt-1">{errors.role}</p>}
            </div>

            {/* Button */}
            <div className="flex justify-center">
              <button
                className="mt-4 bg-[#5EA9A9] text-white rounded w-[250px] h-[60px] p-[10px] transition-all duration-300 font-bold text-[20px]"
                style={{
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  borderRadius: '10px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = "0 6px 12px rgba(187, 250, 244, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                }}
                onClick={handleSubmit}
              >
                Add User
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-[3] h-full">
            <img src={doctor} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADDUser;
