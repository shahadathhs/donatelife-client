import { Helmet } from 'react-helmet-async';

const Blogs = () => {
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