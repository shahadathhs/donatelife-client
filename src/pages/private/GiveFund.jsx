import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const GiveFund = () => {
  return (
    <div>
      <Helmet>
        <title>Give Fund | DonateLife</title>
      </Helmet>
      <div className='pt-20'>
        <div className="container mx-auto p-8">
          {/* Payment form */}
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveFund;