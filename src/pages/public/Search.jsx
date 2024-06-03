import { useState } from 'react';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import useLocations from './../../hooks/useLocations';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const axiosPublic = useAxiosPublic();
  const [location] = useLocations();
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    const locationData = location.find((loc) => loc.district === selectedDistrict);
    setUpazilas(locationData ? locationData.upazilas : []);
  };

  const handleSearch = async (event) => {
    const role = "donor"
    event.preventDefault();
    try {
      const response = await axiosPublic.get('/donors', {
        params: { role, bloodGroup, district, upazila }
      });
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donor data:", error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Search Donors | DonateLife</title>
      </Helmet>
      <div className='p-20'>
        <div className="container mx-auto p-4">
          <h2 className="text-center text-2xl text-blue-600">Search for Donors</h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Blood Group */}
              <div>
                <label className="block text-gray-700">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              {/* District */}
              <div>
                <label className="block text-gray-700">District</label>
                <select
                  value={district}
                  onChange={handleDistrictChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Select District</option>
                  {location.map((loc) => (
                    <option key={loc._id} value={loc.district}>{loc.district}</option>
                  ))}
                </select>
              </div>
              {/* Upazila */}
              <div>
                <label className="block text-gray-700">Upazila</label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>Select Upazila</option>
                  {upazilas.map((upa, index) => (
                    <option key={index} value={upa}>{upa}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Search Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Search
              </motion.button>
            </div>
          </form>
          {/* Donors List */}
          {donors.length > 0 && (
            <div className="mt-8">
              <h3 className="text-center text-xl text-blue-600">Donors List</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {donors.map((donor) => (
                  <motion.div whileHover={{scale: 1.1}}
                  key={donor._id} className="p-4 border rounded shadow-lg text-center">
                    <h4 className="text-xl font-semibold">{donor.name}</h4>
                    <p>Blood Group: {donor.bloodGroup}</p>
                    <p>District: {donor.district}</p>
                    <p>Upazila: {donor.upazila}</p>
                    <p>Contact: {donor.contact}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;