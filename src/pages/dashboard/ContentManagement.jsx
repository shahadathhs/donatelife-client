import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        try {
          const response = await axiosSecure.get(`/users/${user.email}`);
          setUserRole(response.data.role);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setUserRole(null);
        }
      }
    };

    fetchData();
  }, [user?.email, axiosSecure]);

  // filter
  const [filter, setFilter] = useState('all');

  const {data: blogs = [], refetch} = useQuery({
    queryKey: ['blogs', filter ],
    queryFn: async() => {
      const res = await axiosSecure.get('/dashboard/blogs',{
        params: { status: filter }
      });
      return res.data
    }
  })

  const handleFilter = (filter) => {
    setFilter(filter);
    refetch();
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  //const totalBlogs = blogs.length;
  //const totalPages = Math.ceil(totalBlogs / rowsPerPage);
  //console.log(totalPages)
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedBlogs = blogs.slice(start, end);

  // manage publish draft
  const handleDraft = (blog) => {
    console.log('Draft Blog:', blog);
    Swal.fire({
      title: "Are you sure?",
      text: `${blog.title} will be published!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Published this blog!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/published/${blog._id}`)
        .then(res=> {
          console.log(res.data)
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${blog.title} is published now!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    });
  };

  const handlePublished = (blog) => {
    console.log('Published Blog:', blog);
    Swal.fire({
      title: "Are you sure?",
      text: `${blog.title} will be draft!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, draft this blog!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/draft/${blog._id}`)
        .then(res=> {
          console.log(res.data)
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${blog.title} is draft now!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Content Management | DonateLife</title>
      </Helmet>
      <div>
        {/* top */}
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
          <h2 className="text-xl shadow-md p-2">Manage All Blogs Here!</h2>
          <Link to="/dashboard/content-management/add-blog" 
          className="px-6 py-2 font-medium bg-blue-600 text-white w-fit transition-all 
          shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
            Add Blogs
          </Link>
        </div>
        
        {/* Filter Dropdown */}
        <div className='w-full text-center'>
          <div className="dropdown mt-4">
          <div tabIndex={0} role="button" className="btn m-1 text-blue-600 border-2 btn-outline">Filter Users by Status</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 space-y-2 shadow bg-base-100 rounded-box w-52">
              <li><a className="btn btn-sm btn-outline" onClick={() => handleFilter('all')}>All</a></li>
              <li><a className="btn btn-sm btn-outline" onClick={() => handleFilter('draft')}>Draft</a></li>
              <li><a className="btn btn-sm btn-outline" onClick={() => handleFilter('published')}>Published</a></li>
            </ul>
          </div>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Status</th>
                <th>Author</th>
                <th>Summary</th>
                <th>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {/* row */}
              {paginatedBlogs.map(blog => (
                <tr key={blog._id} className='hover'>
                  {/* blog thumbnail */}
                  <td>
                    <div className="avatar">
                       <div className="mask mask-squircle w-12 h-12">
                          <img src={blog.thumbnail} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                  </td>
                  {/* status & author */}
                  <td>{blog.status}</td>
                  <td>{blog.author}</td>
                  <td>
                    {blog.summary.slice(0,20)}<br />
                    {blog.summary.slice(21,40)}
                  </td>
                  {/* action */}
                  <th>
                    {blog.status === 'draft'
                    ?
                    <button onClick={() => handleDraft(blog)} disabled={userRole !== 'admin'}
                    className="btn btn-sm btn-outline text-blue-600">Make publish</button>
                    :
                    <button onClick={() => handlePublished(blog)} disabled={userRole !== 'admin'}
                    className="btn btn-sm btn-outline text-red-600">Make draft</button>
                    }
                  </th>
                </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        
        {/* pagination */}
        <div className='w-full text-center p-4 space-x-3 text-blue-600 '>
          <button className='btn btn-sm btn-outline text-blue-600 hover:shadow-md'
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          <FaArrowAltCircleLeft />Previous</button>
                    
            <span className='font-extrabold'> {currentPage} </span>
                    
        <button className='btn btn-sm btn-outline text-blue-600 hover:shadow-md' 
          onClick={() => setCurrentPage(prev => prev + 1)} disabled={paginatedBlogs.length < rowsPerPage}>
          Next<FaArrowAltCircleRight /></button>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;