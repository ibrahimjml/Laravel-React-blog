import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from '../App.jsx';
import Contact from '../pages/contact page/Contact.jsx';
import Profile from '../pages/profile page/Profile.jsx';
import Login from '../auth/login/Login.jsx';
import Register from '../auth/register/Register.jsx';
import Create from '../pages/create post/Create.jsx';
import Logout from '../auth/logout/Logout.jsx';
import Blogdetail from '../pages/blog detail/Blogdetail.jsx';
import Edit from '../pages/edit post/Edit.jsx';


const Route = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setLoggedIn(token);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/create',
      element: loggedIn ? <Create/> : <Navigate to="/" />,
    },
    {
      path: '/edit/:slug',
      element:  <Edit/> ,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/login',
      element: !loggedIn? <Login /> : <Navigate to="/" />, 
    },
    {
      path: '/register',
      element: !loggedIn ? <Register /> : <Navigate to="/" />, 
    },
    {
      path: '/logout',
      element: loggedIn ? <Logout /> : <Navigate to="/login" />, 
    },
    {
      path: '/blog/:slug',
      element: <Blogdetail/>, 
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Route;
