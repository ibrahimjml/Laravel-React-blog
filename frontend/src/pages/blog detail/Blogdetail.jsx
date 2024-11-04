import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../Context/UserContext";



export default function Blogdetail() {
  const {slug} = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const {user,token} =useContext(UserContext);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/blog/${slug}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.data);
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPost();
  }, [slug]);
const handleDelete= async()=>{

  try {
    const response = await fetch(`http://localhost:8000/api/delete/${slug}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body:JSON.stringify({slug})
    });
   await response.json();
  if(response.ok){
    navigate('/');
  }
  } catch (error) {
    console.error(error.message);
  }
}
  if (!post) return <p>Loading...</p>;

  return (
    <>

    <div className="container mx-auto px-10 mt-4 md:w-3/4 ">
    <div className="flex justify-between ">
    <h1 className="text-4xl font-bold">{post.title}</h1>

    {user.id === post.user_id && <div className="flex gap-3">
      <button className="borrder-none px-5 bg-slate-800 text-white font-semibold rounded-md"><Link to={`/edit/${post.slug}`}>Edit</Link></button>
      <button onClick={handleDelete} className="borrder-none px-5 bg-red-800 text-white font-semibold rounded-md">Delete</button>
  </div>
  }
  
    </div>
      
      <div className="flex gap-4 mt-4">
       <p>BY: <strong>{post.username}</strong></p>
       <p>Created: <strong>{post.createdat}</strong></p>
      </div>
      <img src={`http://localhost:8000/images/${post.image}`} alt={post.title} className="my-4 w-full h-72 object-fill rounded-md" />
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.description }} />
    </div>
    </>
  );
}
