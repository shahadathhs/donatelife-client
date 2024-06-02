import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import { CiMenuKebab } from 'react-icons/ci';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

    // filter
    const [statusFilter, setStatusFilter] = useState('all');
    
    const { data: users = [], refetch } = useQuery({
      queryKey: ['users', statusFilter],
      queryFn: async () => {
        const res = await axiosSecure.get('/users', {
          params: { status: statusFilter }
        });
        return res.data;
      }
    })

    const handleStatusFilter = (filter) => {
      setStatusFilter(filter);
      refetch();
    };
    
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 2;
    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
    console.log(totalPages)
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedUsers = users.slice(start, end);


    // user role handle
    const handleBlock = (user) => {
        console.log('Block user:', user);
        Swal.fire({
          title: "Are you sure?",
          text: `${user.name} will be blocked!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Block this user!"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.patch(`/users/blocked/${user._id}`)
            .then(res=> {
              console.log(res.data)
              if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${user.name} is blocked now!`,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            })
          }
        });
    };

    const handleUnblock = (user) => {
        console.log('Unblock user:', user);
        Swal.fire({
          title: "Are you sure?",
          text: `${user.name} will be active!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Active this user!"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.patch(`/users/active/${user._id}`)
            .then(res=> {
              console.log(res.data)
              if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${user.name} is active now!`,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            })
          }
        });
    };

    const handleMakeVolunteer = (user) => {
      console.log('Make user volunteer:', user)
      Swal.fire({
        title: "Are you sure?",
        text: `${user.name} will be an volunteer!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Volunteer!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/volunteer/${user._id}`)
          .then(res=> {
            console.log(res.data)
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is a volunteer now!`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
        }
      });
    };

    const handleMakeAdmin = (user) => {
        console.log('Make user admin:', user)
        Swal.fire({
          title: "Are you sure?",
          text: `${user.name} will be an admin!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res=> {
              console.log(res.data)
              if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${user.name} is an admin now!`,
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
                <title>All Users | DonateLife</title>
            </Helmet>
            <div>
                {/* banner */}
                <div className="hero">
                  <div className="hero-content text-center">
                    <div className="max-w-lg">
                      <h1 className="text-xl font-bold">Welcome to the User Management Dashboard</h1>
                      <p className="py-6">
                        Efficiently manage your users with ease! Filter through active and blocked users, 
                        and perform administrative actions such as blocking, unblocking, and promoting 
                        users to volunteer or admin roles. Stay in control and keep your community thriving.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Filter Dropdown */}
                <div className='w-full text-center'>
                  <div className="dropdown mt-4">
                    <div tabIndex={0} role="button" className="btn m-1 text-blue-600 border-2 btn-outline">Filter Users by Status</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 space-y-2 shadow bg-base-100 rounded-box w-52">
                      <li><a className="btn btn-sm btn-outline" onClick={() => handleStatusFilter('all')}>All</a></li>
                      <li><a className="btn btn-sm btn-outline" onClick={() => handleStatusFilter('active')}>Active</a></li>
                      <li><a className="btn btn-sm btn-outline" onClick={() => handleStatusFilter('blocked')}>Blocked</a></li>
                    </ul>
                  </div>
                </div>
                
                {/* table */}
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Profile</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row */}
                      {paginatedUsers.map(user => (
                        <tr key={user._id} className='hover'>
                          {/* profile */}
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                  <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                </div>
                              </div>
                              <div>
                                <div className="font-bold">{user.name}</div>
                                <div className="text-sm opacity-50">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          {/* status & role */}
                          <td>{user.status}</td>
                          <td>{user.role}</td>
                          {/* action */}
                          <th>
                            <div className="dropdown dropdown-end">
                              <button tabIndex={0} role="button" 
                                className={`
                                  px-4 py-2 rounded-full flex items-center gap-2 text-slate-500
                                  shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
                                  transition-all
                                  hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
                                  hover:text-violet-500
                              `}
                              >
                                <CiMenuKebab />
                              </button>
                              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                                  {/* block & Unblock */}
                                  {user.status === 'active' ? (
                                    <li><a className="btn btn-sm btn-outline" onClick={() => handleBlock(user)}>Block</a></li>
                                  ) : (
                                    <li><a className="btn btn-sm btn-outline" onClick={() => handleUnblock(user)}>Unblock</a></li>
                                  )}
                                  {/* user role */}

                                  {user.role === 'donor' && (
                                    <>
                                      <li><a className="btn btn-sm btn-outline" onClick={() => handleMakeVolunteer(user)}>Make Volunteer</a></li>
                                      <li><a className="btn btn-sm btn-outline" onClick={() => handleMakeAdmin(user)}>Make Admin</a></li>
                                    </>
                                  )}
                                  
                                  {user.role === 'volunteer' && (
                                    <li><a className="btn btn-sm btn-outline" onClick={() => handleMakeAdmin(user)}>Make Admin</a></li>
                                  )}

                                  {user.role === 'admin' && undefined}
                              </ul>
                            </div>
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
                    onClick={() => setCurrentPage(prev => prev + 1)} disabled={paginatedUsers.length < rowsPerPage}>
                    Next<FaArrowAltCircleRight /></button>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;