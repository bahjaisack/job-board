import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    
    // Redirect to the login page or homepage
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;
