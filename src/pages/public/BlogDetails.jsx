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
        <h2>This is Donation Requests</h2>
      </div>
    </div>
  );
};

export default BlogDetails;