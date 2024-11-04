import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export default function AppProvider({children}){
   const [token, settoken] = useState(localStorage.getItem('access_token'));
   const[user,setuser] = useState(null);

  const fetchuserinfo = async ()=>{
  
    const response = await fetch("http://localhost:8000/api/user",{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json",
        "Authorization":`Bearer ${token}`
    },
    })
       const data = await response.json();
       setuser(data);
  }
  useEffect(()=>{
    if(token){
      fetchuserinfo()
    }
  
  },[token])
  return(
    <UserContext.Provider value={{token ,settoken,user}}>
     {children}
    </UserContext.Provider>
  )
}