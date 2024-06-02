import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";
import useAdminVolunteer from "../hooks/useAdminVolunteer";

const AdminVolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdminVolunteer, isAdminVolunteerLoading] = useAdminVolunteer();
  const location = useLocation();

  if (loading || isAdminVolunteerLoading) {
    return (
      <div className='w-full h-[300px] flex justify-center items-center text-3xl'>
        <span className="loading loading-spinner text-primary"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (user && isAdminVolunteer) {
    return children;
  }

  return <Navigate state={{ from: location.pathname }} to="/" />;
};

export default AdminVolunteerRoute;

AdminVolunteerRoute.propTypes = {
  children: PropTypes.node.isRequired,
};