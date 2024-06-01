import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/icon/logo-2.png";
import { BsMenuButtonWide } from "react-icons/bs";

const Navbar = () => {
  const navLinks =
  <>
    {/* blood donations */}
    <motion.li
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <NavLink to="/donationRequests"
        className={({ isActive }) => isActive 
        ? 'border-2 text-bold hover:shadow-md' : undefined}
      >Donation requests</NavLink>
    </motion.li>
    {/* blogs */}
    <motion.li
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <NavLink to="/blogs"
        className={({ isActive }) => isActive 
        ? 'border-2 text-bold hover:shadow-md' : 'border-0'}
      >Blogs</NavLink>
    </motion.li>
  </>

  return (
    <motion.div 
      whileHover={{ scale: 1.01, rotate: .125 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="navbar bg-blue-500 fixed rounded-md hover:shadow-lg
      max-w-screen-xl mx-auto text-white my-2"
    >
      {/* start */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* hamburger */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-2xl">
            <BsMenuButtonWide />
          </div>
          {/* navLinks for sm/md */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content 
          mt-3 z-[1] p-2 shadow rounded-box w-52 bg-blue-500">
            {navLinks}
          </ul>
        </div>
        {/* logo for all devices */}
        <Link to="/">
          <motion.img
            src={logo} alt="Logo" className="w-[50px] rounded-md"
            whileHover={{ scale: 1.1, rotate: 0.125 }} whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
      </div>
      
      {/* center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks}
        </ul>
      </div>
      
      {/* end */}
      <div className="navbar-end">
        <Link className="btn">Login</Link>
      </div>
    </motion.div>
  );
};

export default Navbar;