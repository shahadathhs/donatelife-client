import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import useAuth from './../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Swal from "sweetalert2";

const RequestDetails = () => {
  const request = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  
  const handleDonation = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDonation = async (event) => {
    event.preventDefault();
    const donorName = user.displayName;
    const donorEmail = user.email;

    try {
      const res = await axiosSecure.patch(`/donationRequests/${request._id}`, {
        status: 'inprogress',
        donorName,
        donorEmail,
      });
      console.log(res.data)
      if (res.data.modifiedCount === 1) {
        Swal.fire({
          title: 'Successful!',
          text: 'Donation Request is inprogress!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        setIsModalOpen(false);
        navigate("/donationRequests")
      }
    } catch (error) {
      console.error('Error updating donation status:', error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Donation Request Details | DonateLife</title>
      </Helmet>
      <div className="pt-20">
        <p className="p-4 text-center text-xl text-blue-600">----View Blood Donation Request Details----</p>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-7">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="space-y-2 text-xl shadow-md p-3 rounded-md"
          >
            <p>Recipient Name: <span className="text-blue-500 font-bold">{request.recipientName}</span></p>
            <p>Recipient District: <span className="text-blue-500 font-bold">{request.recipientDistrict}</span></p>
            <p>Recipient Upazila: <span className="text-blue-500 font-bold">{request.recipientUpazila}</span></p>
            <p>Recipient Blood Group: <span className="text-blue-500 font-bold">{request.recipientBloodGroup}</span></p>
            <p>Donation Date: <span className="text-blue-500 font-bold">{request.donationDate}</span></p>
            <p>Donation Time: <span className="text-blue-500 font-bold">{request.donationTime}</span></p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="space-y-2 text-xl shadow-md p-3 rounded-md"
          >
            <p>Hospital: <span className="text-blue-500 font-bold">{request.hospital}</span></p>
            <p>Full Address: <span className="text-blue-500 font-bold">{request.fullAddress}</span></p>
            <p>Requester Name: <span className="text-blue-500 font-bold">{request.requesterName}</span></p>
            <p>Requester Email: <span className="text-blue-500 font-bold">{request.requesterEmail}</span></p>
            <p>Requester Message: <span className="text-blue-500 font-bold">{request.requesterMessage}</span></p>
            <button onClick={handleDonation} className="btn btn-outline btn-sm text-blue-500">Donate Blood</button>
          </motion.div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Confirm Donation</h2>
            <form onSubmit={handleConfirmDonation}>
              <div className="mb-4">
                <label className="block text-gray-700">Donor Name:</label>
                <input type="text" value={user.displayName} readOnly className="input input-bordered w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Donor Email:</label>
                <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleCloseModal} className="btn btn-outline mr-2">Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Donation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;