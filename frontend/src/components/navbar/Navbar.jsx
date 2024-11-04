import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
 const {user} = useContext(UserContext);

  return (
    <>
    <header className='bg-gray-900 px-7 py-3 flex justify-between'>
      <h1 className='text-xl text-red-500 font-bold capitalize flex justify-start'>react & Laravel</h1>
      <nav className='hidden md:flex items-center '>
        <ul className='flex text-slate-200 text-lg font-medium gap-5  cursor-pointer '>
      

            <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to='/'>home</Link>
              </li>
              {user ? (
                <>
                
            <li>Hello, {user.name}</li>
            <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to='/create'>create</Link>
              </li>
            <li  className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to='/logout'>logout</Link>
              </li>
              </>
        ) : (
          <>
            <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to='/login'>login</Link>
              </li>
              <li className='hover:scale-105 hover:font-semibold hover:text-white capitalize'>
            <Link to='/register'>register</Link>
              </li>
              </>
        )}
        </ul>
      </nav>
    </header>
    <main>
     <Outlet/>
    </main>
    </>
  )
}
