import axios from 'axios';
import { useEffect, useState } from 'react';
import medecielLogo from '../assets/LOgo.svg';
import Sidebar from './AdminSideBare';
import Header from './Header';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in as admin');
          setLoading(false);
          return;
        }

        // Build URL with role filter if not 'All'
        const roleQuery = filter !== 'All' ? `&role=${filter}` : '';
        const usersResponse = await axios.get(`http://localhost:8000/api/recent-users/?days=7${roleQuery}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });

        // Fetch current user
        const userResponse = await axios.get('http://localhost:8000/api/current-user/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });

        setUsers(usersResponse.data);
        setCurrentUser(userResponse.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (role) => {
    setFilter(role);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        firstName={currentUser?.first_name}
        lastName={currentUser?.last_name}
        role={currentUser?.role}
        image={currentUser?.img}
        initials={currentUser?.initials}
      />
      <div className="flex flex-1" style={{ width: '100vw', height: '100vh' }}>
        <Sidebar />
        <div
          className="flex-1 flex ml-[320px] mt-[160px] mr-[60px] mb-[30px] border"
          style={{
            width: 'calc(100vw - 320px - 60px)',
            height: 'calc(100vh - 160px - 30px)',
            border: '3px solid #1B9C92',
            boxShadow: '0 6px 12px rgba(154, 224, 219, 0.5)',
            borderRadius: '13px',
            overflow: 'hidden',
          }}
        >
          <div className="flex-1 flex flex-col p-8 overflow-auto bg-white rounded-[10px] gap-20">
            {/* Message de bienvenue */}
            <div
              className="bg-[#4AACA8] text-white rounded-xl p-6 mb-10 flex justify-between items-center shadow-md h-[200px]"
              style={{ boxShadow: '0 6px 12px rgba(181, 228, 224, 0.9)' }}
            >
              <div>
                <h2 className="text-[30px] font-bold mb-2">
                  Hello {currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : 'Admin'}, welcome back to the platform.
                </h2>
                <p className="text-[20px]">
                  You can now manage users, oversee system activity, and ensure everything runs smoothly. Have a great day!
                </p>
              </div>
              <div className="text-right text-3xl font-bold italic text-[#054350] flex-[0.3] items-center">
                <img src={medecielLogo} alt="Medeciel Logo" className="h-full w-full object-contain" />
              </div>
            </div>

            {/* Recently Added */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[30px] font-bold text-[#086972] border-b-2 border-[#002C4E] inline-block">
                  Recently Added
                </h3>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1B9C92] text-white rounded hover:bg-[#165E72]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filter
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      {['All', 'Medecin', 'Assistant', 'Director'].map((role) => (
                        <button
                          key={role}
                          onClick={() => handleFilterChange(role)}
                          className={`w-full text-left px-4 py-2 text-[#002C4E] hover:bg-[#95BFC3] ${
                            filter === role ? 'bg-[#1B9C92] text-white' : ''
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {loading && <p className="text-[20px] text-gray-500">Loading users...</p>}
              {error && <p className="text-[20px] text-red-500">{error}</p>}
              {!loading && !error && users.length === 0 && (
                <p className="text-[20px] text-gray-500">No users found.</p>
              )}
              {!loading && !error && users.length > 0 && (
                <table className="w-full table-auto text-left" style={{ borderRadius: '13px' }}>
                  <thead>
                    <tr className="text-teal-700 font-semibold border-b-2 border-gray-300 h-[20px]">
                      <th className="py-2 text-[20px]">Name</th>
                      <th className="py-2 text-[20px]">Email</th>
                      <th className="py-2 text-[20px]">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={index}
                        className="py-4 px-4 border-[3px] border-[#002C4E] hover:bg-gray-50 h-[100px] text-[20px] text-[#002C4E]"
                      >
                        <td className="py-4 flex items-center gap-4 p-5 mt-5">
                          <img
                            src={
                              user.img || 
                              `https://ui-avatars.com/api/?name=${user.initials}&background=1B9C92&color=fff&size=128`
                            }
                            alt={`${user.name} avatar`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <span>{user.name || `${user.first_name} ${user.last_name}`}</span>
                        </td>
                        <td className="py-4 text-teal-700 font-medium">{user.email}</td>
                        <td className="py-4">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;