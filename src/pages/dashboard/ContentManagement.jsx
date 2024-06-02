import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div>
      <Helmet>
        <title>Content Management | DonateLife</title>
      </Helmet>
      <div>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
          <h2 className="text-xl shadow-md p-2">Manage All Blogs Here!</h2>
          <Link to="/dashboard/content-management/add-blog" 
          className="px-6 py-2 font-medium bg-blue-600 text-white w-fit transition-all 
          shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
            Add Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;