import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [fundingAmount, setFundingAmount] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState('');
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (fundingAmount > 0) { 
      axiosSecure.post("/create-payment-intent", { price: fundingAmount })
        .then(res => {
          console.log("Client Secret:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error('Error creating payment intent:', error);
        });
    } else {
      console.error('Invalid fundingAmount:', fundingAmount);
    }
  }, [axiosSecure, fundingAmount]);

  const handleAmountChange = (e) => {
    setFundingAmount(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('');
    }

    // Confirm card payment
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'anonymous',
          },
        },
      },
    );

    if (confirmError) {
      console.log('[confirmError]', confirmError);
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log("Transaction Id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        
        // Get current UTC date
        const currentUTCDate = moment.utc();
        // Convert and format the date
        const formattedDate = currentUTCDate.format('YYYY-MM-DD HH:mm:ss');

        // Save the payment to the database
        const payment = {
          name: user.displayName,
          email: user.email,
          transactionId: paymentIntent.id,
          fundAmount: parseInt(fundingAmount),
          fundingDate: formattedDate
        }

        const res = await axiosSecure.post('/payments', payment);
        console.log("funding saved", res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Your funding successfully received",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/funding');
        }
      }
    }
  };

  return (
    <div className="m-2 p-2 shadow-sm rounded-md">
      <h2 className="text-center font-semibold text-3xl text-blue-600">Donate Fund</h2>
      <form onSubmit={handleSubmit} 
      className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-9 border-2 p-3 mt-6 rounded-md hover:shadow-sm">
        <div>
          <label className="label">
            Fund Amount (USD)
          </label>
          <input
            type="number"
            value={fundingAmount}
            onChange={handleAmountChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label">
            Card info
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <button type="submit" disabled={!stripe || !clientSecret} 
          className="btn btn-outline text-blue-600 max-w-sm btn-sm">
          Donate Fund ${fundingAmount}
        </button>
        { error && <p className="text-red-500">{error}</p>}
        { transactionId && <p className="text-green-500">Your transaction ID: {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;