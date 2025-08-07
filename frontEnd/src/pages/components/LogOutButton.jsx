import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // 👈 Remove token
    alert('Logged out successfully!');
    navigate('/login');               // 👈 Redirect to login page
  };

  return (
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;