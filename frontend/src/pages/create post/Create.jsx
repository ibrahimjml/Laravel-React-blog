
import {  useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Editor } from '@tinymce/tinymce-react';

export default function Create() {
  const[title,settitle] = useState(null);
  const[description,setdescription] = useState(null);
  const[image,setimage] = useState(null);
  const[error,seterror] = useState(null);
  const[loading,setloading] = useState(false);
  const handleSubmit = async (eo)=>{
    eo.preventDefault();
    seterror(null);
    setloading(true);

    if(!title || !description || !image){
      seterror('All inputes required');
      setloading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image",image);
    formData.append("title", title);
    formData.append("description", description);

      const token = localStorage.getItem('access_token');
      const response = await fetch("http://localhost:8000/api/create/post",{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body: formData
      });
       await response.json();
      if(!response.ok){
        seterror("server error");
        setloading(false);
        return;
      }else{
        eo.target.reset();
      }
    
    setloading(false);
    
  }



  return (
    <>
    <Navbar/>
    <h1 className='text-3xl text-black text-center py-3'>Create Post</h1>
<div className='w-[50%] container mx-auto border border-gray-300 rounded-lg shadow-lg'>

  <form className="p-6" onSubmit={handleSubmit}>
    
  
    <div className="flex flex-wrap">
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
        Title:
      </label>
  
      <input id="title" type="text" className="rounded-sm p-2 border-2 form-input w-full outline-none "
          name="title"  required autoComplete="title"  onChange={(eo)=>{settitle(eo.target.value)}}/>
  
    
  </div>
    <div>
      <label htmlFor="textarea" className="mt-2 block text-gray-700 text-sm font-bold mb-2 sm:mb-4">Description :</label>
      <Editor
              apiKey ={import.meta.env.VITE_API_KEY_TINY}
              init={{
                height: 300,
                menubar: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                content_css: '//www.tiny.cloud/css/codepen.min.css',
              }}
              onEditorChange={(content) => setdescription(content)}
            />

    </div>
    <div>
      <label htmlFor="image" className="mt-2 block text-gray-700 text-sm font-bold mb-2 sm:mb-4">Image :</label>
      <input type="file" name="image" className="rounded-sm p-2 border-2 form-input w-full " onChange={(eo)=>{setimage(eo.target.files[0])}} />
  
    </div>
    
    <div className="mt-4 ">
      <button type="submit"
      className="w-[200px]  select-none font-bold  p-3 rounded-lg text-xl  no-underline text-gray-100 bg-gray-700 hover:bg-gray-500 sm:py-4">
      {loading ? "Loading.." :"Create"}
      </button>
    </div>
  </form>
  <p>{error}</p>
   </div>

  
    </>
  )
}
