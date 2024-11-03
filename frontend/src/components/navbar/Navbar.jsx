import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  const[user,setuser] = useState(null);

  const fetchuserinfo = async ()=>{
    const token = localStorage.getItem('access_token');
    const response = await fetch("http://localhost:8000/api/user",{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization":`Bearer ${token}`
    },
    })
    
    if(!response.ok){
      return null;
    }else{
      const data = await response.json();
      return data;
    }
    
  }
  useEffect(()=>{
    fetchuserinfo().then((data)=>{
      if(data){
        setuser(data.name);
      } else {
        setuser(null);
      }
    });
},[])
  return (
    <div className='bg-gray-900 px-7 py-3 flex justify-between'>
      <h1 className='text-xl text-red-500 font-bold capitalize flex justify-start'>react & Laravel</h1>
      <nav className='hidden md:flex items-center '>
        <ul className='flex text-slate-200 text-lg font-medium gap-5  cursor-pointer '>
      

            <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to={'/'}>home</Link>
              </li>
              {user ? (
                <>
                
            <li>Hello, {user}</li>
            <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to={'/create'}>create</Link>
              </li>
            <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to={'/logout'}>logout</Link>
              </li>
              </>
        ) : (
          <>
            <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to={'/login'}>login</Link>
              </li>
              <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to={'/register'}>register</Link>
              </li>
              </>
        )}
        </ul>
      </nav>
    </div>
  )
}
