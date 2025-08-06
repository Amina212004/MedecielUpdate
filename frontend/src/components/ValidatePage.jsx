import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import Header from './Header';
import Sidebar from './AdminSideBare' 

const ValidatePage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      if (!token) {
        console.error('No token found in localStorage');
        alert('Please log in as admin');
        return;
      }
      console.log('Fetching with token:', token);
      const response = await axios.get('http://localhost:8000/api/verify-user/', {
        headers: { Authorization: `Token ${token}` },
      });
      console.log('API Response:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      alert(`Failed to fetch users: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/verify-user/',
        {
          user_id: id,
          action: 'accept',
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log('Accept response:', response.data);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error accepting user:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      alert(`Failed to verify user: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/verify-user/',
        {
          user_id: id,
          action: 'delete',
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log('Delete response:', response.data);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      alert(`Failed to delete user: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div
          className="flex-1 ml-[320px] mt-[160px] mr-[60px] mb-[30px]"
          style={{
            border: '3px solid #1B9C92',
            boxShadow: '0 6px 12px rgba(154, 224, 219, 0.5)',
            borderRadius: '13px',
            overflow: 'hidden',
          }}
        >
          <div className="flex flex-col w-full h-full overflow-auto p-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
              <thead className="bg-teal-400 text-white">
                <tr style={{ border: '2px solid #002C4E' }}>
                  <th className="py-3 px-4 text-left font-semibold text-[20px]">First Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-[20px]">Last Name</th>
                  <th className="py-3 px-4 text-left font-semibold text-[20px]">Email</th>
                  <th className="py-3 px-4 text-left font-semibold text-[20px]">Role</th>
                  <th className="py-3 px-4 text-center font-semibold text-[20px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-gray-100"
                    style={{ border: '2px solid #002C4E' }}
                  >
                    <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px]">
                      {user.first_name}
                    </td>
                    <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px]">
                      {user.last_name}
                    </td>
                    <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px]">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 text-[#002C4E] font-semibold text-[20px]">
                      {user.role}
                    </td>
                    <td className="py-2 px-4 flex justify-center items-center space-x-4">
                      <FaCheckCircle
                        className="text-green-500 hover:text-green-700 cursor-pointer text-xl"
                        onClick={() => handleAccept(user.id)}
                        title="Verify User"
                      />
                      <FaTrash
                        className="text-red-500 hover:text-red-700 cursor-pointer text-xl"
                        onClick={() => handleDelete(user.id)}
                        title="Delete User"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatePage;