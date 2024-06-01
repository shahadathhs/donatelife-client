import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useLocations = () => {
  const axiosPublic = useAxiosPublic();

  const {data: locations = [], isPending: loading} = useQuery({
    queryKey: ['locations'],
    queryFn: async() => {
      const res = await axiosPublic.get('/location');
      return res.data
    }
  })

  return [locations, loading]
};

export default useLocations;