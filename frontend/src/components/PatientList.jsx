import React, { useState, useEffect } from "react";
import Sidebar from "./AdminSideBare";
import Header from "./Header";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const getInitials = (first, last) => {
  return (first?.[0] || "") + (last?.[0] || "");
};

const PatientList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filter, setFilter] = useState("All"); // All, Teacher, Student, ATS
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:8000/api/current-user/", {
        headers: { Authorization: `Token ${token}` },
      });
      setCurrentUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCurrentUser();
}, []);

  const fetchPatients = async (page = 1, role = filter) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in as admin");
        setLoading(false);
        return;
      }

      const roleQuery = role !== "All" ? `&role=${role.toLowerCase()}` : "";

      const response = await axios.get(
        `http://localhost:8000/api/patients/?page=${page}${roleQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      setPatients(response.data.results);
      setTotalCount(response.data.count);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Erreur récupération patients", err);
      setError("Impossible de charger les patients");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(currentPage, filter);
  }, [currentPage, filter]);

useEffect(() => {
  let filtered = patients;

  // Filtrer par rôle si besoin
  if (filter !== "All") {
    filtered = filtered.filter((p) => p.role === filter);
  }

  // Appliquer le filtre de recherche texte
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.first_name.toLowerCase().includes(lowerSearch) ||
        p.last_name.toLowerCase().includes(lowerSearch) ||
        p.email.toLowerCase().includes(lowerSearch)
    );
  }

  setFilteredPatients(filtered);
}, [patients, filter, searchTerm]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header
          firstName={currentUser?.first_name || ""}
          lastName={currentUser?.last_name || ""}
          role={currentUser?.role || ""}
          image={currentUser?.image || null}
          initials={
          (currentUser?.first_name?.[0] || "") + (currentUser?.last_name?.[0] || "")
          }
        />
        <div
          className="flex-1 flex-col ml-[320px] mt-[160px] mr-[60px] mb-[30px]"
          style={{
            width: "calc(100vw - 320px - 60px)",
            height: "calc(100vh - 160px - 30px)",
            border: "3px solid #1B9C92",
            boxShadow: "0 6px 12px rgba(154, 224, 219, 0.5)",
            borderRadius: "13px",
            overflow: "hidden",
          }}
        >
          {/* Barre de recherche et filtre */}
          <div className="flex justify-between items-center mt-10 mx-10">
            <div className="flex items-center border border-teal-500 rounded-full px-3 py-1 w-1/2">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
              <FaSearch className="text-teal-500" />
            </div>

            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1); // reset à la page 1
              }}
              className="bg-teal-500 text-white rounded-md px-4 py-2 outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
              <option value="ATS">ATS</option>
            </select>
          </div>

          {/* Table des patients */}
          <div className="overflow-hidden mt-10">
            {loading ? (
              <div className="text-center py-10 text-teal-500 font-semibold">
                Chargement...
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-white text-[#002C4E]">
                  <tr>
                    <th className="py-4 px-4">First Name</th>
                    <th className="py-3 px-4">Last Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((p, index) => (
                      <tr key={index} className="border-t-2 border-b-2 border-[#1B9C92] text-[#002C4E]">
                        <td className="flex items-center gap-3 py-3 px-4">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt="Profile"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                              {getInitials(p.first_name, p.last_name)}
                            </div>
                          )}
                          {p.first_name}
                        </td>
                        <td className="py-3 px-4">{p.last_name}</td>
                        <td className="py-3 px-4">{p.email}</td>
                          <td className="py-3 px-4 flex items-center gap-2">
                            <button
                             className={`w-4 h-4 rounded-full focus:outline-none ${
                             p.is_active ? "bg-[#1DAEA2]" : "bg-[#FF9F9F]"
                           }`}
                            aria-label={p.is_active ? "Active" : "Deactivated"}
                            />
                            <span>{p.is_active ? "Active" : "Deactivated"}</span>
                        </td>
                      </tr>
                    ))
                  ) : !error ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        Aucun patient trouvé
                      </td>
                    </tr>
                  ) : null}
                  {error && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-red-500">
                        {error}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between mx-10 my-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-4 py-2 bg-teal-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center">Page {currentPage}</span>
            <button
              disabled={patients.length === 0 || patients.length < 10}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-teal-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
