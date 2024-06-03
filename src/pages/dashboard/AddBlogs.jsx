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
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Upload the thumbnail
    let thumbnailUrl = '';
    if (thumbnailFile) {
      const formData = new FormData();
      formData.append('image', thumbnailFile);
      const res = await axiosPublic.post(imageHostingAPI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      thumbnailUrl = res.data.data.display_url;
    }

    // Create the new blog object
    const currentDate = moment().format('YYYY-MM-DD');
    const newBlog = { title, thumbnail: thumbnailUrl, summary, content, 
      author: user.displayName, authorImage: user.photoURL, 
      date: currentDate, status: 'draft' };
    console.log(newBlog)

    // Submit the new blog
    await axiosSecure.post('/blogs', newBlog).then(res => {
      if (res.data.insertedId) {
        console.log(res.data)
        Swal.fire({
          title: 'Successful!',
          text: 'New blog successfully added!',
          icon: 'success',
          confirmButtonText: 'Cool'
        });
      }
    });

    // Reset the form
    event.target.reset();
    setTitle('');
    setSummary('');
    setContent('');
    setThumbnailFile(null);
    } catch (error) {
      console.error("Error uploading image: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading image!"
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Blog | DonateLife</title>
      </Helmet>
      <div>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
          <h2 className="text-xl shadow-md p-2">Add Blog related to Blood Donation!</h2>
          <Link to="/dashboard/content-management" 
          className="px-6 py-2 font-medium bg-blue-600 text-white w-fit transition-all 
          shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
            Back to Content Management
          </Link>
        </div>
        <div className='mt-4 space-y-3'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <label>
              <div>Title:</div>
              <input required className='input input-bordered w-full' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            
            <label>
              <div>Thumbnail:</div>
              <input required className='file-input file-input-bordered file-input-primary w-full' type="file" onChange={(e) => setThumbnailFile(e.target.files[0])} />
            </label>
            
            <label className='col-span-1 md:col-span-2'>
              <div>Summary:</div>
              <textarea required className='textarea textarea-bordered w-full' value={summary} onChange={(e) => setSummary(e.target.value)} />
            </label>
            
            <label className='col-span-1 md:col-span-2'>
              <div>Content:</div>
              <JoditEditor required value={content} onChange={setContent} />
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