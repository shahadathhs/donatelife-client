import { IoHomeOutline } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineContentPasteGo, MdOutlineSpaceDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { FaBlog, FaSearch, FaUsers } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { BiSolidDonateBlood, BiSolidDonateHeart } from "react-icons/bi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { RiAddLargeFill } from "react-icons/ri";

const DashboardLayout = () => {
  const userRole = 'admin';

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content border-[1px] border-blue-500 shadow-md m-2 rounded-md p-2">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        <Outlet />
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-60 min-h-full bg-blue-600 text-white space-y-2">
          {/* Sidebar content here */}
          {/* home links */}
          <li>
            <Link to="/"
            className="rounded-2xl border-2 border-dashed border-blue-600 
            bg-white px-6 py-3 font-semibold uppercase text-black transition-all 
            duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md 
            hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] 
            active:rounded-2xl active:shadow-none">
              <IoHomeOutline /> Back To Home
            </Link>
          </li>
          
          <div className="divider text-black divider-neutral">OR</div>
          {/* dashboard */}
          <motion.li
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NavLink to="/dashboard"
              className={({ isActive }) => isActive 
              ? 'text-bold hover:shadow-md' : undefined}
            ><MdOutlineSpaceDashboard />Dashboard</NavLink>
          </motion.li>
          {/* dashboard profile */}
          <motion.li
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NavLink to="/dashboard/profile"
              className={({ isActive }) => isActive 
              ? 'text-bold shadow-md' : undefined}
            ><ImProfile />Profile</NavLink>
          </motion.li>

          {/* role based links */}
          {userRole === 'admin' &&
          <motion.li
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NavLink to="/dashboard/all-users"
              className={({ isActive }) => isActive 
              ? 'text-bold shadow-md' : undefined}
            ><FaUsers />All Users</NavLink>
          </motion.li>
          }

          {(userRole === 'admin' || userRole === 'volunteer') &&
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NavLink
              to="/dashboard/all-blood-donation-request"
              className={({ isActive }) => isActive ? 'text-bold shadow-md' : undefined}
            >
              <FaCodePullRequest />All Blood Donation Request
            </NavLink>
          </motion.li>
          }

          {(userRole === 'admin' || userRole === 'volunteer') &&
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NavLink
              to="/dashboard/content-management"
              className={({ isActive }) => isActive ? 'text-bold shadow-md' : undefined}
            >
              <MdOutlineContentPasteGo />Content Management
            </NavLink>
          </motion.li>
          }

          {userRole === 'donor' &&
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NavLink
              to="/dashboard/my-donation-requests"
              className={({ isActive }) => isActive ? 'text-bold shadow-md' : undefined}
            >
              <BiSolidDonateBlood />My Donation Requests
            </NavLink>
          </motion.li>
          }

          {userRole === 'donor' &&
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <NavLink
              to="/dashboard/create-donation-request"
              className={({ isActive }) => isActive ? 'text-bold shadow-md' : undefined}
            >
              <RiAddLargeFill />Create Donation Requests
            </NavLink>
          </motion.li>
          }
          
          <div className="divider text-black divider-neutral">OR</div>
          {/* common links */}
          {/* donation requests */}
          <motion.li
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to="/donationRequests"
              className={({ isActive }) => isActive 
              ? 'border-2 text-bold hover:shadow-md' : undefined}
            ><BiSolidDonateHeart />Donation requests</Link>
          </motion.li>
          {/* blogs */}
          <motion.li
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to="/blogs"
              className={({ isActive }) => isActive 
              ? 'border-2 text-bold hover:shadow-md' : 'border-0'}
            ><FaBlog />Blogs</Link>
          </motion.li>
          {/* funding */}
          <motion.li
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to="/funding"
              className={({ isActive }) => isActive 
              ? 'border-2 text-bold hover:shadow-md' : 'border-0'}
            ><AiOutlineFundProjectionScreen />Funding</Link>
          </motion.li>
          {/* search */}
          <motion.li
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link to="/search"
              className={({ isActive }) => isActive 
              ? 'border-2 text-bold hover:shadow-md' : 'border-0'}
            ><FaSearch />Search</Link>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;