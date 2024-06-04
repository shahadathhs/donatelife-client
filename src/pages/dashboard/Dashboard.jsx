import { Helmet } from "react-helmet-async";
import useAxiosSecure from './../../hooks/useAxiosSecure';
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import { CiMenuKebab} from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { FiUser, FiUsers } from "react-icons/fi";
import { AiOutlineFundView } from "react-icons/ai";
import { MdBloodtype } from "react-icons/md";

const Dashboard = () => {
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
  //console.log(userRole)


  // FOR DONOR ONLY
  // FOR DONOR ONLY
  const {data: donorRequest = [], refetch} = useQuery({
    queryKey: ['donorRequest', user.email],
    queryFn: async() => {
      const res =  await axiosSecure.get(`/donationRequests?email=${user.email}`)
      return res.data
    }
  })
  const lastThreeReversed = donorRequest.slice(-3).reverse();
  //console.log(lastThreeReversed);
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

  // FOR ADMIN AND VOLUNTEER
  // FOR ADMIN AND VOLUNTEER
  const {data: adminStats = []} = useQuery({
    queryKey: ['adminStats'],
    queryFn: async() => {
      const res =  await axiosSecure.get('/admin-stats')
      return res.data
    }
  })
  console.log(adminStats)

  return (
    <div>
      <Helmet>
        <title>Dashboard | DonateLife</title>
      </Helmet>
      <div>
        <h2 className="p-4 text-center text-2xl">Welcome Back!!!!!!</h2>
        <h2 className="pb-4 text-center text-3xl text-blue-600">{user.displayName}</h2>
        <div>
          {userRole === "donor"&&
            <div>
              <h2 className="text-center text-xl text-blue-600 p-4">Your recent donation requests:</h2>
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
                    {lastThreeReversed.map(single =>
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
              <div className="text-center p-4">
                <Link to="/dashboard/my-donation-requests" className="btn btn-outline text-blue-600">
                  View My All Request
                </Link>
              </div>
            </div>
          }
          {
            userRole !== "donor" &&
            <div className="p-4">
              <p className="text-4xl font-semibold mb-2 p-6">STATS</p>
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card
                  title={`Donors: ${adminStats.totalDonors}`}
                  subtitle={`Users: ${adminStats.users}`} Icon={FiUser}
                />
                
                <Card title={`${adminStats.fundingContributors}`} 
                subtitle="Contributors"  Icon={FiUsers} />
                
                <Card title={`${adminStats["totalFunds"]["$numberDecimal"]}`} 
                 subtitle="Total Fund" Icon={AiOutlineFundView} />
                
                <Card
                  title={`${adminStats.donationRequests}`}
                  subtitle="Donation Requests" Icon={MdBloodtype}
                />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </a>
  );
};

export default Dashboard;