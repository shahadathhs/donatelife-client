
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const Funding= () => {
  const axiosSecure = useAxiosSecure()
  const {data: funding = []} = useQuery({
    queryKey: ['funding'],
    queryFn: async() => {
      const res = await axiosSecure.get('/payments');
      return res.data
    }
  })
  console.log(funding)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;
  //const totalUsers = users.length;
  //const totalPages = Math.ceil(totalUsers / rowsPerPage);
  //console.log(totalPages)
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedFunding = funding.slice(start, end);

  return (
    <div>
      <Helmet>
        <title>Funding | DonateLife</title>
      </Helmet>
      <div className='pt-20'>
        <div className="container mx-auto p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Check who contributed in funding!</h2>
            <Link to="/funding/giveFund" className='btn btn-outline text-blue-600'>Give Fund</Link>
          </div>
          {/* funding list table */}
          <div className="overflow-x-auto shadow-md p-3 max-w-lg mx-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Fund Amount</th>
                  <th>Funding Time</th>
                </tr>
              </thead>
              <tbody>
                {/* row */}
                {
                  paginatedFunding.map((fund, index)=>
                    <tr key={fund._id} className='hover'>
                      <th>{index+1}</th>
                      <td>{fund.name}</td>
                      <td>{fund.fundAmount}</td>
                      <td>{fund.fundingDate}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          
          {/* pagination */}
          <div className='w-full text-center p-4 space-x-3 text-blue-600 '>
            <button className='btn btn-sm btn-outline text-blue-600 hover:shadow-md'
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            <FaArrowAltCircleLeft />Previous</button>
                    
              <span className='font-extrabold'> {currentPage} </span>
                    
            <button className='btn btn-sm btn-outline text-blue-600 hover:shadow-md' 
              onClick={() => setCurrentPage(prev => prev + 1)} disabled={paginatedFunding.length < rowsPerPage}>
              Next<FaArrowAltCircleRight /></button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;