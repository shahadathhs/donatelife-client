import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import useAuth from './../../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Login = () => {
  const { login} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state  || "/";

  const handleLogin = event => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginUser = {email, password};
    console.table(loginUser)

    login(email, password)
      .then((result) => {
        console.log(result.user)
        Swal.fire({
          title: 'Successful!',
          text: 'You Login Successful',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
        if (result.user) {
          navigate(from);
        } 
      })
      .catch((error)=> {
        Swal.fire({
          title: 'Error!',
          text: 'Password or Email did not match!',
          icon: 'error',
          confirmButtonText: 'Try Again'
        })
        console.log(error)
      })
  }

  return (
    <div>
      <Helmet>
        <title>Login | DonateLife</title>
      </Helmet>
      <div className="py-24 min-h-screen">
        <div className="text-center">
          <h2 className="mb-3 text-3xl font-semibold">Login into your account</h2>
          <p>
            Do not have an account? Register
            <Link to="/register" className="ml-2 focus:underline hover:underline text-blue-600">
              here
            </Link>
          </p>
        </div>

        {/* Register form */}
        <div className="w-full md:w-1/2 mx-auto shadow-lg sm:p-8 dark:bg-gray-900 dark:text-gray-100">
          <form onSubmit={handleLogin} className="space-y-8 p-4">
            <div className="grid grid-cols-1 gap-4">
              
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
              
              {/* Password */}
              <div className="relative">
                <div className="label">
                  <span className="label-text">Password :</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" placeholder="#######" required
                  
                  className="input input-bordered w-full"
                />
                <span className="absolute top-[52px] right-4" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              
            </div>
            {/* Submit Button */}
            <motion.input
              type="submit" value="Login"
              className="font-bold btn btn-outline text-blue-600 hover:shadow-md"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;