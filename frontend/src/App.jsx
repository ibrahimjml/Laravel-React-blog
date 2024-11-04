import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home page/Home';
import Create from './pages/create post/Create';
import Login from './auth/login/Login';
import Register from './auth/register/Register';
import Logout from './auth/logout/Logout';
import Blogdetail from './pages/blog detail/Blogdetail'
import Edit from './pages/edit post/Edit'
import { UserContext } from './Context/UserContext';
import { useContext } from 'react';

export default function App() {
const {user} = useContext(UserContext);

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Navbar/>}>
      <Route index element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/login' element={user ? <Home/>:<Login/>}/>
        <Route path='/register' element={user ? <Home/>:<Register/>}/>
        <Route path='/logout' element={user ?<Logout/>:<Home/>}/>
        <Route path='/blog/:slug' element={<Blogdetail/>}/>
        <Route path='/edit/:slug' element={user ? <Edit/> :<Home/>}/>
           
         </Route>
    
  </Routes>
  </BrowserRouter>

  )
}


