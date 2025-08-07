// src/pages/AdminProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AdminProtectedRoute = ({ children }) => {
  const [isAdminAuth, setIsAdminAuth] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem('adminToken'); // or just 'token' if shared
      if (!token) {
        setIsAdminAuth(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verifyToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAdminAuth(true);
        } else {
          setIsAdminAuth(false);
        }
      } catch (err) {
        setIsAdminAuth(false);
      }
    };

    verifyAdmin();
  }, []);

  if (isAdminAuth === null) return <p>Loading...</p>;
  if (!isAdminAuth) return <Navigate to="/adminLogIn" />;

  return children;
};

export default AdminProtectedRoute;
