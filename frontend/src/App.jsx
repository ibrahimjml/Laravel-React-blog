import { useEffect, useState } from 'react';
import './App.css';
import Blogcard from './components/blogcard/Blogcard';
import Navbar from './components/navbar/Navbar';

function App() {
  const [blog, setBlog] = useState();

  const fetchBlog = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/blog", {
        method: "GET"
      });
      const data = await response.json();
      
      setBlog(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <>
      <Navbar />
      <h1 className='text-center text-3xl font-bold py-3 text-gray-500'>Blog Posts</h1>
      <div className='container mx-auto w-[80%] py-5 flex-wrap md:flex gap-3'>
        {blog && blog.map((data) => (
             <Blogcard key={data.id} blog={data} />
        ))}
      </div>
    </>
  );
}

export default App;
