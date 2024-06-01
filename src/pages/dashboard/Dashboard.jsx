import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div>
      <Helmet>
        <title>Dashboard | DonateLife</title>
      </Helmet>
      <div>
        <h2>This is dashboard</h2>
      </div>
    </div>
  );
};

export default Dashboard;