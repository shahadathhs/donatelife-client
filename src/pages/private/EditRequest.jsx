import { format } from "date-fns";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useLocations from "../../hooks/useLocations";
import { motion } from 'framer-motion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditRequest = () => {
  const editRequest = useLoaderData();
  console.log(editRequest)

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [location] = useLocations();
  const [district, setDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);

  const handleDistrict = event => {
    const singleLocation = event.target.value;
    setDistrict(singleLocation);
  };

  useEffect(() => {
    if (district) {
      const selectedDistrict = location.find(d => d.district === district);
      setUpazilas(selectedDistrict?.upazilas || []);
    } else {
      setUpazilas([]);
    }
  }, [district, location]);

  const handleEditRequest = event => {
    event.preventDefault();

    const form = event.target;

    const donationRequest = {
      requesterName: form.name.value,
      requesterEmail: form.email.value,
      recipientName: form.recipientName.value,
      recipientBloodGroup: form.recipientBloodGroup.value,
      recipientDistrict: form.recipientDistrict.value,
      recipientUpazila: form.RecipientUpazila.value,
      hospital: form.hospital.value,
      fullAddress: form.fullAddress.value,
      requesterMessage: form.requesterMessage.value,
      donationDate: format(new Date(startDate), "dd MMM yyyy"),
      donationTime: format(new Date(startTime), "hh:mm aa 'UTC'"),
    };
    console.log(donationRequest);
    axiosSecure.patch(`/editingRequests/${editRequest._id}`, donationRequest)
      .then(res => {
        console.log(res.data)
        if(res.data.modifiedCount === 1){
          Swal.fire({
            title: 'Successful!',
            text: 'Donation Request Updated Successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          form.reset()
          //navigate(form)
        }
      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update donation request. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      })
  };

  return (
    <div>
      <Helmet>
        Edit Donation Request | DonateLife
      </Helmet>
      <div>
        <h2 className="text-center text-2xl text-blue-600">Edit Your Donation Request</h2>
        <div className="w-full shadow-lg sm:p-8 dark:bg-gray-900 dark:text-gray-100">
          <form onSubmit={handleEditRequest} className="space-y-8 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <div className="label">
                  <span className="label-text">Requester name :</span>
                </div>
                <input
                  type="text" name="name" defaultValue={user.displayName} disabled
                  className="input input-bordered w-full"
                />
              </div>
              
              <div>
                <div className="label">
                  <span className="label-text">Requester Email :</span>
                </div>
                <input
                  type="email" name="email" defaultValue={user.email} disabled
                  className="input input-bordered w-full"
                />
              </div>
              
              <div>
                <div className="label">
                  <span className="label-text">Recipient name :</span>
                </div>
                <input
                  type="text" name="recipientName" placeholder="Recipient name" required
                  className="input input-bordered w-full"
                />
              </div>
              
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Recipient Blood Group</span>
                </div>
                <select className="select select-bordered" name="recipientBloodGroup" required>
                  <option disabled defaultValue>Pick one</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </label>
              
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Recipient District</span>
                </div>
                <select onChange={handleDistrict} className="select select-bordered" name="recipientDistrict" required>
                  <option disabled defaultValue>Pick one</option>
                  {
                    location.map(singleLocation =>
                      <option key={singleLocation._id} value={singleLocation.district}>
                        {singleLocation.district}
                      </option>
                    )
                  }
                </select>
              </label>
              
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Recipient Upazila</span>
                </div>
                <select className="select select-bordered" name="RecipientUpazila" required>
                  <option disabled defaultValue>Pick one</option>
                  {
                    upazilas.map((singleLocation, index) =>
                      <option key={index} value={singleLocation}>
                        {singleLocation}
                      </option>
                    )
                  }
                </select>
              </label>
              
              <div>
                <div className="label">
                  <span className="label-text">Hospital :</span>
                </div>
                <input
                  type="text" name="hospital" placeholder="Hospital" required
                  className="input input-bordered w-full"
                />
              </div>
              
              <div>
                <div className="label">
                  <span className="label-text">Full address :</span>
                </div>
                <input
                  type="text" name="fullAddress" placeholder="Full Address Line" required
                  className="input input-bordered w-full"
                />
              </div>
              
              <div className="col-span-1 md:col-span-2">
                <div className="label">
                  <span className="label-text">Requester Message :</span>
                </div>
                <textarea
                  type="text" name="requesterMessage" placeholder="Why do you want Blood?" required
                  className="textarea textarea-bordered w-full"
                />
              </div>
              
              <div>
                <div className="label">
                  <span className="label-text">Donation Date :</span>
                </div>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="input input-bordered w-full" />
              </div>
              
              <div>
                <div className="label">
                  <span className="label-text">Donation Time :</span>
                </div>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            
            <motion.input
              type="submit" value="Update Request"
              className="font-bold btn btn-outline text-blue-600 hover:shadow-md"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRequest;