import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null: loading, false: rejected, true: success

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuth(false);
        
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/auth/verifyToken', {//see and make changes in the url
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch(err) {
        console.log('catch err:'+err);
        setIsAuth(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
