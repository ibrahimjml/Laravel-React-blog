import { useEffect, useState } from "react";
import Blogcard from "../../components/blogcard/Blogcard";



export default function Home() {
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
    
      <h1 className='text-center text-3xl font-bold py-3 text-gray-500'>Blog Posts</h1>
      <div className='container mx-auto w-[80%] py-5 flex-wrap md:flex gap-3'>
        {blog && blog.map((data) => (
             <Blogcard key={data.id} blog={data} />
        ))}
      </div>
    </>
  );
}

