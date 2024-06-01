import { Helmet } from "react-helmet-async";
import errorImage from "../error/error-bg.jpg"
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <Helmet>
        <title>Error Page | DonateLife </title>
      </Helmet>
      <div className="hero min-h-screen">
        <img src={errorImage} className="min-h-screen object-cover max-w-xl"/>
        <div className="hero-overlay bg-opacity-40 max-w-xl"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-md space-y-2">
            <div className="space-y-2 text-2xl">
              <h1>Oops!</h1>
              <p>An unexpected error has occurred.</p>
              <p>
                <i>{error.statusText || error.message}</i>
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block"
            >
              <Link to="/" className="btn btn-outline text-white">
                Go back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;