import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { motion } from 'framer-motion';
import useLocations from "../../hooks/useLocations";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const DashboardProfile = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth();
  const [loginUser, setLoginUser] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.email) {
        try {
          const response = await axiosSecure.get(`/users/${user.email}`);
          setLoginUser(response.data);
          if (response.data.district) {
            setDistrict(response.data.district);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setLoginUser(null);
        }
      }
    };

    fetchData();
  }, [user?.email, axiosSecure]);

  const [location] = useLocations();
  const [district, setDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);

  const handleDistrict = event => {
    const singleLocation = event.target.value;
    setDistrict(singleLocation);
  }

  useEffect(() => {
    if (district) {
      const selectedDistrict = location.find(d => d.district === district);
      setUpazilas(selectedDistrict?.upazilas || []);
    } else {
      setUpazilas([]);
    }
  }, [district, location]);

  const handleProfileUpdate = async(event) => {
    event.preventDefault();
    
    const form = event.target;
    const imageFile = form.imageFile.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      let imageUrl = loginUser?.photo;

      if (imageFile) {
        const res = await axiosPublic.post(imageHostingAPI, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrl = res.data.data.display_url;
      }

      const name = form.name.value;
      const bloodGroup = form.bloodGroup.value;
      const district = form.district.value;
      const upazila = form.upazila.value;

      const updatedProfile = { name, bloodGroup, district, upazila, photo: imageUrl };

      axiosSecure.patch(`/updatingProfile/${loginUser._id}`, updatedProfile)
      .then(res => {
        if(res.data.modifiedCount === 1){
          Swal.fire({
            title: 'Successful!',
            text: 'Profile Updated Successfully!',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          setLoginUser({ ...loginUser, ...updatedProfile });
          setIsEditable(false);
        }
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update profile. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });
      
    } catch (error) {
      console.error("Error uploading image: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error uploading image!"
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard Profile | DonateLife</title>
      </Helmet>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Check Your Profile!</h2>
          <button 
            onClick={() => setIsEditable(!isEditable)} 
            className='btn btn-outline text-blue-600'>
              {isEditable ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        <div className="w-full h-auto sm:p-8 dark:bg-gray-900 dark:text-gray-100">
          {loginUser && (
            <form onSubmit={handleProfileUpdate} className="space-y-8 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profile Picture */}
                <div className="flex justify-center">
                  <img src={loginUser.photo} alt="Profile" className="w-32 h-32 rounded-full mb-4" />
                </div>
                {/* Name */}
                <div>
                  <div className="label">
                    <span className="label-text">Your name :</span>
                  </div>
                  <input
                    type="text" name="name" defaultValue={loginUser?.name} required
                    className="input input-bordered w-full"
                    disabled={!isEditable}
                  />
                </div>
                {/* Photo */}
                {isEditable && (
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Pick a file for profile image</span>
                    </div>
                    <input name='imageFile'
                      type="file" className="file-input file-input-bordered w-full" 
                      disabled={!isEditable}
                    />
                  </label>
                )}
                {/* Email */}
                <div>
                  <div className="label">
                    <span className="label-text">Your Email Address :</span>
                  </div>
                  <input
                    type="email" name="email" defaultValue={loginUser?.email} disabled
                    className="input input-bordered w-full"
                  />
                </div>
                {/* Blood Group */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Select your Blood Group</span>
                  </div>
                  <select className="select select-bordered" name="bloodGroup" defaultValue={loginUser?.bloodGroup} disabled={!isEditable}>
                    <option disabled value="">Pick one</option>
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
                {/* District */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Select Your Home District</span>
                  </div>
                  <select onChange={handleDistrict}
                  className="select select-bordered" name="district" defaultValue={loginUser?.district} disabled={!isEditable}>
                    <option disabled value="">Pick one</option>
                    {
                      location.map(singleLocation =>
                        <option key={singleLocation._id} 
                        value={singleLocation.district}>
                          {singleLocation.district}
                        </option>
                      )
                    }
                  </select>
                </label>
                {/* Upazila */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Select Your Upazila</span>
                  </div>
                  <select className="select select-bordered" name="upazila" defaultValue={loginUser?.upazila} disabled={!isEditable}>
                    <option disabled value="">Pick one</option>
                    {
                      upazilas?.map((singleLocation ,index) =>
                        <option key={index} 
                        value={singleLocation}>
                          {singleLocation}
                        </option>
                      )
                    }
                  </select>
                </label>
              </div>
              {isEditable && (
                <motion.input
                  type="submit" value="Update"
                  className="font-bold btn btn-outline text-blue-600 hover:shadow-md"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                />
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;