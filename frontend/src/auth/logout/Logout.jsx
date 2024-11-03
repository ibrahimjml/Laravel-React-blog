import { useCallback, useEffect } from 'react';

const LogoutPage = () => {
  const handleLogout = useCallback(async () => {
    const token = localStorage.getItem('access_token');

    if (token) {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
    }

    localStorage.removeItem('access_token');
    window.location.href = '/login';
  }, []); 

  useEffect(() => {
    handleLogout();
  }, [handleLogout]); 


};

export default LogoutPage;
