import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from './../../hooks/useAxiosPublic';

const Blogs = () => {
  const axiosPublic = useAxiosPublic()
  const {data: publicBlogs = []} = useQuery({
    queryKey: ['publicBlogs'],
    queryFn: async() => {
      const res = await axiosPublic.get('/blogs');
      return res.data
    }
  })
  console.log(publicBlogs)

  return (
    <div>
      <Helmet>
        <title>Blogs | DonateLife</title>
      </Helmet>
      <div className='pt-20'>
        <div className='p-3'>
          <h2>This is Blogs</h2>
        </div>
      </div>
    </div>
  );
};

export default Blogs;