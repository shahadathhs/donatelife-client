import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from './../../hooks/useAxiosPublic';
import useAuth from './../../hooks/useAuth';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import useLocations from "../../hooks/useLocations";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile, logOut } = useAuth();

  // navigation systems
  const navigate = useNavigate();
  const locations = useLocation();
  const from = locations?.state || "/login";

  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [location] = useLocations();
  //console.log(location);
  //const districts = location.map(singleLocation => singleLocation.district)
  //console.log(districts)
  const [district, setDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  
  const handleDistrict = event => {
    const singleLocation = event.target.value;
    setDistrict(singleLocation)
  }
  //console.log("selected district", district)
  
  useEffect(() => {
    if (district) {
      const selectedDistrict = location.find(d => d.district === district);
      setUpazilas(selectedDistrict?.upazilas);
    } else {
      setUpazilas([]);
    }
  }, [district, location]);
  //console.log("selected upazilas", upazilas)


  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6) {
      setPasswordError("Password must be 6 or more characters");
      return;
    }

    if (!/[!@#$%^&*()_+\-={}';":,.<>?]+/.test(newPassword)) {
      setPasswordError("Password must have at least 1 special character");
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      setPasswordError("Password must have at least 1 lowercase letter");
      return;
    }

    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleEmailRegister = async(event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    
    const form = event.target;
    const imageFile = form.imageFile.files[0];

    // Create FormData to upload the file
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      // Upload the image to imgbb
      const res = await axiosPublic.post(imageHostingAPI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const imageUrl = res.data.data.display_url;

      const name = form.name.value;
      const email = form.email.value;
      const bloodGroup = form.bloodGroup.value;
      const role = "donor";
      const status = "active";
      const district = form.district.value;
      const upazila = form.upazila.value;

      const userDetails = { name, email, bloodGroup, role, status, district, upazila, photo: imageUrl };
      console.table(userDetails);

     //Create user and update profile
      createUser(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          logOut();
          Swal.fire({
            title: 'Successful!',
            text: 'New user successfully created. Now you can login!',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          updateUserProfile(name, imageUrl).then(() => {
            navigate(from);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          Swal.fire({
            title: 'Error!',
            text: 'Sorry! We were not able to register your account.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
        });
    } catch (error) {
      console.error("Error uploading image: ", error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <Helmet>
        <title>Register | DonateLife</title>
      </Helmet>
      <div className="py-24 min-h-screen">
        <div className="text-center">
          <h2 className="mb-3 text-3xl font-semibold">Create new account</h2>
          <p>
            Already have an account? Login
            <Link to="/login" className="ml-2 focus:underline hover:underline text-blue-600">
              here
            </Link>
          </p>
        </div>

        {/* Register form */}
        <div className="w-full shadow-lg sm:p-8 dark:bg-gray-900 dark:text-gray-100">
          <form onSubmit={handleEmailRegister} className="space-y-8 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <div className="label">
                  <span className="label-text">Your name :</span>
                </div>
                <input
                  type="text" name="name" placeholder="Enter full name" required
                  className="input input-bordered w-full"
                />
              </div>
              {/* Photo */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Pick a file for profile image</span>
                </div>
                <input required name='imageFile'
                type="file" className="file-input file-input-bordered w-full" />
              </label>
              {/* Email */}
              <div>
                <div className="label">
                  <span className="label-text">Your Email Address :</span>
                </div>
                <input
                  type="email" name="email" placeholder="name@example.com" required
                  className="input input-bordered w-full"
                />
              </div>
              {/* Blood Group */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select your Blood Group</span>
                </div>
                <select className="select select-bordered" name="bloodGroup">
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
              {/* District */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select Your Home District</span>
                </div>
                <select onChange={handleDistrict}
                className="select select-bordered" name="district">
                  <option disabled defaultValue>Pick one</option>
                  {
                    location.map(singleLocation =>
                      <option key={singleLocation._id} 
                      value={singleLocation.district}>
                        {singleLocation.district}
                      </option>
                    )
                  }
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
              {/* upazila */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Select Your Upazila</span>
                </div>
                <select className="select select-bordered" name="upazila">
                  <option disabled defaultValue>Pick one</option>
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
              {/* Password */}
              <div className="relative">
                <div className="label">
                  <span className="label-text">Password :</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" placeholder="#######" required
                  value={password} onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                />
                <span className="absolute top-[52px] right-4" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {/* Confirm Password */}
              <div className="relative">
                <div className="label">
                  <span className="label-text">Confirm Password :</span>
                </div>
                <input type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword" placeholder="######" required
                  value={confirmPassword} onChange={handleConfirmPasswordChange}
                  className="input input-bordered w-full"
                />
                <span className="absolute top-[52px] right-4" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {passwordError && <small className="text-red-500">{passwordError}</small>}
              {confirmPasswordError && <small className="text-red-500">{confirmPasswordError}</small>}
            </div>
            {/* Submit Button */}
            <motion.input
              type="submit" value="Register"
              className="font-bold btn btn-outline text-blue-600 hover:shadow-md"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;