
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const {settoken} = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (eo)=>{
    eo.preventDefault();
    seterror(null);
    setloading(true);

if(!email || !password){
  seterror('inputs cannot be empty');
  setloading('false');
  return;
}


  try {
      const response = await fetch("http://localhost:8000/oauth/token", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept":"application/json"
              
          },
          body: JSON.stringify({
              grant_type: "password",
              client_id: import.meta.env.VITE_PASSPORT_PASSWORD_CLIENT,
              client_secret: import.meta.env.VITE_PASSPORT_PASSWORD_SECRET_KEY,
              username: email,
              password: password,
          }),
      });


      const data = await response.json();
      if(data.message){
        seterror('The credentials were incorrect');
        setloading(false);
        return;
      }
      if (!response.ok) {
          seterror('server error');
          setloading(false);
          return;
      }else{
        eo.target.reset();
        setloading(false);
        navigate('/');
      }
      
      localStorage.setItem('access_token',data.access_token);
      settoken(data.access_token);
  } catch (error) {
      console.error("Error during login:", error.message);
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
                    Login
                </header>

                <form className="border-2 w-full px-6 space-y-6 sm:px-10 sm:space-y-8" onSubmit={handleSubmit}>

                    <div className="flex flex-wrap">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 mt-4 sm:mb-4">
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
                        <button type="submit"
                            className="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
                            {loading ? "Loading..":"Login"}
                        </button>
                        
                          <a className="text-gray-500 mt-2 hover:text-blue-700 no-underline hover:underline" href="{{ route('forgot.password') }}">
                            forgot your password ?
                          </a>
                      
                        <p className="w-full text-xs text-center text-gray-700 my-6 sm:text-sm sm:my-8">
                            Dont have an account?
                            <a className="text-gray-500 hover:text-blue-700 no-underline hover:underline" href="{{ route('register') }}">
                              Register
                            </a>
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
