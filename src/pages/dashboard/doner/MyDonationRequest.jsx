import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcViewDetails } from "react-icons/fc";
import { useState } from "react";

const MyDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // filter
  const [statusFilter, setStatusFilter] = useState('all');

  const {data: myDonorRequest = [], refetch} = useQuery({
    queryKey: ['myDonorRequest', user.email],
    queryFn: async() => {
      const res =  await axiosSecure.get(`/myDonationRequests?email=${user.email}`,{
        params: { status: statusFilter }
      })
      return res.data
    }
  })

  const handleStatusFilter = (filter) => {
    setStatusFilter(filter);
    refetch();
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  //const totalUsers = users.length;
  //const totalPages = Math.ceil(totalUsers / rowsPerPage);
  //console.log(totalPages)
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedrequest = myDonorRequest.slice(start, end);

  // manage status
  const handleDone = singleRequest => {
    console.log("status done", singleRequest)
    Swal.fire({
      title: "Are you sure?",
      text: `This request will be done!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, this request is done!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/donationRequests/done/${singleRequest._id}`)
        .then(res=> {
          console.log(res.data)
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `This request is done now!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    });
  }
  const handleCancel = singleRequest => {
    console.log("status cancel", singleRequest)
    Swal.fire({
      title: "Are you sure?",
      text: `This request will be cancel!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel this request!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/donationRequests/cancel/${singleRequest._id}`)
        .then(res=> {
          console.log(res.data)
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `This request is cancel now!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    });
  }
  // delete request
  const handleDelete = singleRequest => {
    console.log("request delete", singleRequest)
    Swal.fire({
      title: "Are you sure?",
      text: `This request will be permanently deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this request!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donationRequests/${singleRequest._id}`)
        .then(res=> {
          console.log(res.data)
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `This request has been deleted!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    });
  }
  return (
    <div>
      <Helmet>
        <title>My Donation Requests | DonateLife</title>
      </Helmet>
      <div>
        <h2 className="p-4 text-center text-2xl text-blue-600">
          This is the list of all donation request.
        </h2>
        <div>
                {/* Filter Dropdown */}
                <div className='w-full text-center'>
                  <div className="dropdown mt-4">
                    <div tabIndex={0} role="button" className="btn m-1 text-blue-600 border-2 btn-outline">Filter Users by Status</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 space-y-2 shadow bg-base-100 rounded-box w-52">
                      <li><a className="btn btn-sm btn-outline" onClick={() => handleStatusFilter('all')}>All</a></li>
                      <li><a className="btn btn-sm btn-outline" onClick={() => handleStatusFilter('pending')}>Pending</a></li>
                      <li><a className="btn btn-sm btn-outline" onClick={() => handleStatusFilter('cancel')}>Cancel</a></li>
                      <li><a className="btn btn-sm btn-outline" onClick={() => handleStatusFilter('inprogress')}>Inprogress</a></li>
                    </ul>
                  </div>
                </div>
                
                {/* data table */}
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Recipient name</th>
                        <th>Location</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Donor</th>
                        <th>Edit Status</th>
                        <th>Delete</th>
                        <th>Edit</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row */}
                      {paginatedrequest.map(single =>
                      <tr key={single._id}>
                        <th>{single.recipientName}</th>
                        <td>{single.recipientUpazila} , <br /> {single.recipientDistrict}</td>
                        <td>{single.donationDate} <br /> {single.donationTime}</td>
                        <td>{single.status}</td>
                        
                        {
                          single.status === "inprogress"
                          ?
                          <td>
                            {single.donorName} <br /> {single.donorEmail}
                          </td>
                          :
                          <td>Not Inprogress</td>
                        }
                        
                        {
                          single.status === "inprogress"
                          ?
                          <td>
                            <div className="dropdown dropdown-end">
                              <button tabIndex={0} role="button" className="btn btn-outline btn-sm text-green-600">
                                <CiMenuKebab />
                              </button>
                              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 space-y-2">
                                {/* Done & Cancel */}
                                <li><a className="btn btn-sm btn-outline" onClick={() => handleDone(single)}>Done</a></li>
                                <li><a className="btn btn-sm btn-outline" onClick={() => handleCancel(single)}>Cancel</a></li>
                              </ul>
                            </div>
                          </td>
                          :
                          <td>Not Inprogress</td>
                        }
                        {/* delete */}
                        <td>
                          <button  className="btn btn-sm btn-outline text-red-600" onClick={() => handleDelete(single)}
                          > <MdDelete /> </button>
                        </td>
                        {/* edit */}
                        <td>
                          <Link to={`/dashboard/donationRequest/${single._id}`}
                          className="btn btn-sm btn-outline text-orange-600"
                          > <FaEdit /> </Link>
                        </td>
                        {/* details */}
                        <td> 
                          <Link to={`/requestDetails/${single._id}`} className="btn btn-sm btn-outline text-indigo-500"><FcViewDetails /></Link> 
                        </td>
                      </tr>
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
                    onClick={() => setCurrentPage(prev => prev + 1)} disabled={paginatedrequest.length < rowsPerPage}>
                    Next<FaArrowAltCircleRight /></button>
                </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequest;