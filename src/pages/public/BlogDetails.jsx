import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const BlogDetails = () => {
  const blog = useLoaderData();
  console.log(blog)

  return (
    <div>
      <Helmet>
        <title>{blog.title} | DonateLife</title>
      </Helmet>
      <div className='pt-20'>
        <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 dark:bg-gray-800 dark:text-gray-50">
          <div className="w-full mx-auto space-y-4 text-center">
            <p className="text-2xl font-semibold tracking-wider uppercase">{blog.title}</p>
            <h1 className="text-xl leading-tight">{blog.summary}</h1>
            <img src={blog.thumbnail} alt="" />
            <p className="text-sm dark:text-gray-400 space-x-2"> 
              <span itemProp="name">By {blog.author}</span>
              <span>On {blog.date}</span>
            </p>
          </div>
          <div className="dark:text-gray-100">
            <p>{blog.content}</p>
          </div>
          <div className="pt-12 border-t dark:border-gray-700">
            <div className="flex flex-col items-center space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img src={blog.authorImage} alt="" className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700" />
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold">Author: {blog.author}</h4>
                <p className="dark:text-gray-400">Publish Date: {blog.date}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetails;