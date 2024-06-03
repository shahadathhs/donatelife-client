import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
          <div className="grid place-content-center ">
            <BubbleText />
          </div>
          <section className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
              
              <motion.a
                    whileHover={{
                      scale: 1.005,
                      backgroundColor: "rgba(37, 99, 235, 0.1)", // Tailwind blue-500 with 10% opacity
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
                    }}
                    className="w-full rounded-md shadow-md flex flex-col md:flex-row
                    items-center
                    dark:bg-gray-900 dark:text-gray-100">
                <img src={publicBlogs[0]?.thumbnail} alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
                <div className="p-6 space-y-2 lg:col-span-5">
                  <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
                    {publicBlogs[0]?.title}
                  </h3>
                  <span className="text-xs dark:text-gray-400">{publicBlogs[0]?.date}</span>
                  <p>{publicBlogs[0]?.summary}</p>
                  <Link to={`/blogsDetails/${publicBlogs[0]?._id}`} type="button" 
                    className="btn btn-outline text-blue-500">Read more</Link>
                </div>
              </motion.a>
              
              <div
              className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {
                  publicBlogs.slice(1).map(blog=>
                    <motion.div key={blog._id}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(37, 99, 235, 0.1)", // Tailwind blue-500 with 10% opacity
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)"
                    }}
                    className="max-w-xs rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
                      <img src={blog?.thumbnail} alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
                      <div className="flex flex-col justify-between p-6 space-y-8">
                        <div className="space-y-2">
                          <h2 className="text-xl font-semibold tracking-wide">{blog.title}</h2>
                          <p className="dark:text-gray-100">{blog.summary}</p>
                        </div>
                        <Link to={`/blogsDetails/${blog._id}`} type="button" 
                        className="btn btn-outline text-blue-500">Read more</Link>
                      </div>
                    </motion.div>
                  )
                }
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const BubbleText = () => {
  return (
    <h2 className="text-center text-5xl font-medium text-blue-500">
      {"Check All Blogs!".split("").map((child, idx) => (
        <span className="hoverText" key={idx}>
          {child}
        </span>
      ))}
    </h2>
  );
};

export default Blogs;

