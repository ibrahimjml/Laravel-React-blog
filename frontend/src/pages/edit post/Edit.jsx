import { Editor } from "@tinymce/tinymce-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const{token}=useContext(UserContext);
  const navigate = useNavigate();
  const { slug } = useParams();

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/blog/${slug}`);
      const data = await response.json();
    
      if (data.success) {
        setTitle(data.data.title);
        setDescription(data.data.description);
      } 
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setError(null);
    setLoading(true);

    if (!title || !description ) {
      setError("All inputs required");
      setLoading(false);
      return;
    }

  
    const response = await fetch(`http://localhost:8000/api/update/${slug}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });
    const data = await response.json();

    if (!response.ok) {
      
      setError(data.message);
    } else {
      navigate('/');
      fetchPost();  
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPost(); 
  }, [slug]);

  return (
    <>

      <h1 className="text-3xl text-black text-center py-3">Edit Post</h1>
      <div className="w-[70%] container mx-auto border border-gray-300 rounded-lg shadow-lg">
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2 sm:mb-4"
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              className="rounded-sm p-2 border-2 form-input w-full outline-none"
              name="title"
              required
              autoComplete="title"
              value={title} 
              onChange={(eo) => setTitle(eo.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="textarea"
              className="mt-2 block text-gray-700 text-sm font-bold mb-2 sm:mb-4"
            >
              Description :
            </label>
            <Editor
              apiKey={import.meta.env.VITE_API_KEY_TINY}
              init={{
                height: 300,
                menubar: false,
                plugins: "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                content_css: "//www.tiny.cloud/css/codepen.min.css",
              }}
              value={description} 
              onEditorChange={(content) => setDescription(content)}
            />
          </div>
          
          <div className="mt-4">
            <button
              type="submit"
              className="w-[200px] select-none font-bold p-3 rounded-lg text-xl no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4"
            >
              {loading ? "Loading.." : "Update"}
            </button>
          </div>
        </form>
        <p>{error}</p>
      </div>
    </>
  );
}
