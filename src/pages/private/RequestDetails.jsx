import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const RequestDetails = () => {
  const request = useLoaderData();
  console.log(request)
  return (
    <div>
      <Helmet>
        <title>Donation Request Details | DonateLife</title>
      </Helmet>
      <div>
        <h2>This is Blood Request Details</h2>
      </div>
    </div>
  );
};

export default RequestDetails;