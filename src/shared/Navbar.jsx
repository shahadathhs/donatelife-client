import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/icon/logo-2.png";
import { BsMenuButtonWide } from "react-icons/bs";
import useAuth from './../hooks/useAuth';
import ProfileView from "../components/ProfileView";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = useAuth();

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
    {/* funding */}
    {
      user
      ?
      <motion.li
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <NavLink to="/funding"
          className={({ isActive }) => isActive 
          ? 'border-2 text-bold hover:shadow-md' : 'border-0'}
        >Funding</NavLink>
      </motion.li>
      :
      <motion.li
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <NavLink to="/login"
          className={({ isActive }) => isActive 
          ? 'border-2 text-bold hover:shadow-md' : 'border-0'}
        >Login</NavLink>
      </motion.li>
    }
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
        {/* logo for all devices */}
        <Link to="/">
          <motion.img
            src={logo} alt="Logo" className="w-[30px] rounded-md"
            whileHover={{ scale: 1.1, rotate: 0.125 }} whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
        {/* menu dropdown for sm/md */}
        <div className="dropdown">
          <motion.div 
          whileHover={{ scale: 1.1, rotate: 0.125 }} whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          tabIndex={0} role="button" className="p-2 text-2xl lg:hidden">
            <BsMenuButtonWide />
          </motion.div>
          {/* navLinks for sm/md */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content 
          mt-3 z-[1] p-2 shadow rounded-box w-52 bg-blue-500">
            {navLinks}
          </ul>
        </div>
        {/* user avatar */}
        {
          user
          ?
          <div className="hidden md:flex">
            <ProfileView />
          </div>
          :
          undefined
        }
      </div>
      
      
      {/* end */}
      <div className="navbar-end">
        {/* links */}
        <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navLinks}
          </ul>
        </div>
        {/* user avatar */}
        {
          user
          ?
          <div className="flex md:hidden">
            <ProfileView />
          </div>
          :
          undefined
        }
        {/* theme toggle */}
        <ThemeToggle />
      </div>
    </motion.div>
  );
};

export default Navbar;