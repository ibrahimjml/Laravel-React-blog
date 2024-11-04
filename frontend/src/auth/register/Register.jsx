
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Register() {
  const [name, setname] = useState(null);
  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [password_confirmation, setpassword_confirmation] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (eo)=>{
   eo.preventDefault();
   seterror(null);
   setloading(true);

   if(!name || !username || !email || !password || !password_confirmation){
       seterror(true);
       setloading(false);
       return;
   }else if (password !== password_confirmation) {
    seterror("Password not match");
    setloading(false);
    return;
  }

  const fetchRegister = await fetch("http://localhost:8000/api/register",{
    method:"POST",
  headers:{
    "Content-Type": "application/json",
  },
  body: JSON.stringify({name,username,email,password,password_confirmation})
  });
   await fetchRegister.json();
  
if(fetchRegister.ok){
  eo.target.reset();
  navigate('/login');
}else{
  seterror('server error');
  return;
}
setloading(false);
  }

  
  return (
    <>
    
    <main className="sm:container mx-auto  max-w-fit mt-5 mb-20 sm:max-w-lg sm:mt-10">
    <div className="flex">
        <div className="w-full">
            <section className="flex flex-col break-words bg-white sm:border-1 sm:rounded-md  sm:shadow-lg">

                <header className=" font-bold text-center bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
                    Register
                </header>

                <form className="border-2 w-full px-6 space-y-6 sm:px-10 sm:space-y-8" onSubmit={handleSubmit}>
                <div className="flex flex-wrap">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 mt-4 sm:mb-4">
                          Name:
                        </label>

                        <input id="name" type="name"
                            className="rounded-sm p-2 border-2 form-input w-full " name="name"
                            autoComplete="name" onChange={(eo)=>{setname(eo.target.value)}}/>

                      
                    </div>
                    <div className="flex flex-wrap">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2  sm:mb-4">
                          Username:
                        </label>

                        <input id="username" type="username"
                            className="rounded-sm p-2 border-2 form-input w-full " name="username"
                             autoComplete="username" onChange={(eo)=>{setusername(eo.target.value)}}/>

                      
                    </div>

                    <div className="flex flex-wrap">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2  sm:mb-4">
                          E-Mail Address:
                        </label>

                        <input id="email" type="email"
                            className="rounded-sm p-2 border-2 form-input w-full " name="email"
                              autoComplete="email" onChange={(eo)=>{setemail(eo.target.value)}}/>

                      
                    </div>
                    <div className="flex flex-wrap">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                          Password:
                        </label>

                        <input id="password" type="password"
                            className="rounded-sm p-2 border-2 form-input w-full " name="password"
                             autoComplete="new-password" onChange={(eo)=>{setpassword(eo.target.value)}}/>

                        
                    </div>
                    <div className="flex flex-wrap">
                        <label htmlFor="password-confirm" className="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                          Confirm-password:
                        </label>

                        <input id="password-confirm" type="password"
                            className="rounded-sm p-2 border-2 form-input w-full " name="password-confirm"
                             autoComplete="new-password-confirm" onChange={(eo)=>{setpassword_confirmation(eo.target.value)}}/>

                        
                    </div>
                    
                    <div className="flex flex-wrap">
                        <button type="submit"
                            className="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
                            {loading ? "Loading..":"Register"}
                        </button>
                        
                          <a className="text-gray-500 mt-2 hover:text-blue-700 no-underline hover:underline" href="">
                            forgot your password ?
                          </a>
                      
                        <p className="w-full text-xs text-center text-gray-700 my-6 sm:text-sm sm:my-8">
                            Allready have an account?
                            <Link to={'/login'} className="text-gray-500 hover:text-blue-700 no-underline hover:underline" href="{{ route('register') }}">
                              Login
                            </Link>
                        </p>
                    </div>
                </form>
                <p className='text-center text-xl text-rose-600'>{error}</p>
            </section>
        </div>
    </div>
</main>
    </>
  )
}
