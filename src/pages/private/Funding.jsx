
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Funding= () => {

  return (
    <div>
      <Helmet>
        <title>Funding Page | DonateLife</title>
      </Helmet>
      <div className='pt-20'>
        <div className="container mx-auto p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Check who contributed in funding!</h2>
            <Link to="/funding/giveFund" className='btn btn-outline text-blue-600'>Give Fund</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;