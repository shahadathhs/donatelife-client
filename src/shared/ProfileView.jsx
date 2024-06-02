import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useAuth from '../hooks/useAuth';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProfileView = () => {
  const {user} = useAuth();

  return (
    <div className="flex justify-center px-3">
      <FlyoutLink FlyoutContent={PricingContent}>
      <div className="avatar flex items-center">
        <div className="w-[30px] rounded">
          <img src={user.photoURL} alt="Tailwind-CSS-Avatar-component" />
        </div>
      </div>
      </FlyoutLink>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  const { logOut } = useAuth();
  
  const handleLogout = () =>{
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Successful!",
              text: "You have been successfully logout.",
              icon: "success"
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Unsuccessful!",
              text: "Au error detected. Try again",
              icon: "error"
            });
          }); 
      }
    });
  }

  return (
    <div className="w-40 bg-white p-3 z-50 shadow-xl space-y-2">
      <motion.button
        className="border-[1px] border-blue-600 rounded-md text-bold hover:shadow-md w-full text-blue-600"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      >  <Link to='/dashboard'>Dashboard</Link>
      </motion.button>
      <motion.button onClick={handleLogout}
        className="border-[1px] border-blue-600 rounded-md text-bold hover:shadow-md w-full text-blue-600"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      > Logout
      </motion.button>
    </div>
  );
};

export default ProfileView;