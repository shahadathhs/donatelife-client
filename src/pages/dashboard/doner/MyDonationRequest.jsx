import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

const MyDonationRequest = () => {
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

  const {data: donorRequest = [], refetch} = useQuery({
    queryKey: ['donorRequest', user.email],
    queryFn: async() => {
      const res =  await axiosSecure.get(`/donationRequests?email=${user.email}`)
      return res.data
    }
  })
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
        <h2 className="p-4 text-center text-2xl">Welcome Back!!!!!!</h2>
        <h2 className="pb-4 text-center text-3xl text-blue-600">{user.displayName}</h2>
        <div>
          {userRole === "donor"&&
          <div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>Recipient name</th>
                    <th>Recipient location</th>
                    <th>Donation Date & Time</th>
                    <th>Donation Status</th>
                    <th>Edit Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row */}
                  {donorRequest.map(single =>
                  <tr key={single._id}>
                    <th>{single.recipientName}</th>
                    <td>{single.recipientUpazila} , <br /> {single.recipientDistrict}</td>
                    <td>{single.donationDate} <br /> {single.donationTime}</td>
                    <td>{single.status}</td>
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
                      <td>NOT INPROGRESS</td>
                    }
                    <td>
                      <button  className="btn btn-sm btn-outline text-red-600" onClick={() => handleDelete(single)}
                      > <MdDelete /> </button>
                    </td>
                  </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequest;