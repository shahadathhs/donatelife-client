import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdminVolunteer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdminVolunteer, isPending: isAdminVolunteerLoading } = useQuery({
    queryKey: [user?.email, 'isAdminVolunteer'],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await axiosSecure.get(`/users/adminVolunteer/${user.email}`);
      return res.data?.adminVolunteer;
    }
  });

  return [isAdminVolunteer, isAdminVolunteerLoading];
};

export default useAdminVolunteer;