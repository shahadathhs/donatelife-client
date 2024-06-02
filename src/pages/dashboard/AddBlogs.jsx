import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import JoditEditor from 'jodit-react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import moment from 'moment';
import useAuth from '../../hooks/useAuth';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const AddBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  console.log(user.displayName)
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const handleThumbnailUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      // Upload the image to imgbb
      const res = await axiosPublic.post(imageHostingAPI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setThumbnail(res.data.data.display_url);
    }catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentDate = moment().format('YYYY-MM-DD');
    const newBlog = { title, thumbnail, summary, content, author: user.displayName, date: currentDate, status: 'draft' };
    console.log(newBlog)
    await axiosSecure.post('/blogs', newBlog).then(res => {
      console.log(res.data)
      if(res.data.insertedId){
        Swal.fire({
          title: 'Successful!',
          text: 'New blog successfully added!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      }
    });
    event.target.reset();
  };

  return (
    <div>
      <Helmet>
        <title>Add Blog | DonateLife</title>
      </Helmet>
      <div>
        {/* top content */}
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
          <h2 className="text-xl shadow-md p-2">Add Blog related to Blood Donation!</h2>
          <Link to="/dashboard/content-management" 
          className="px-6 py-2 font-medium bg-blue-600 text-white w-fit transition-all 
          shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
            Back to Content Management
          </Link>
        </div>
        {/* form */}
        <div className='mt-4 space-y-3'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <label>
              <div>Title:</div>
              <input className='input input-bordered w-full' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            
            <label>
              <div>Thumbnail:</div>
              <input className='file-input file-input-bordered file-input-primary w-full' type="file" onChange={handleThumbnailUpload} />
              {/* {thumbnail && <img src={thumbnail} alt="Thumbnail" />} */}
            </label>
            
            <label className='col-span-1 md:col-span-2'>
              <div>Summary:</div>
              <textarea className='textarea textarea-bordered w-full' value={summary} onChange={(e) => setSummary(e.target.value)} />
            </label>
            
            <label className='col-span-1 md:col-span-2'>
              <div>Content:</div>
              <JoditEditor value={content} onChange={setContent} />
            </label>

            <motion.input
              type="submit" value="Create"
              className="font-bold btn btn-outline text-blue-600 hover:shadow-md col-span-1 md:col-span-2"
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.9 }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;