import Banner from "./Banner";
import ContactUs from "./ContactUs";
import { Featured } from "./Featured";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <div>
        <Helmet>
          <title>DonateLife | Every Drops Count</title>
        </Helmet>
      </div>
      <div>
        <Banner />
        <Featured />
        <ContactUs />
      </div>
    </div>
  );
};

export default Home;