import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DonationRequest = () => {
  const axiosPublic = useAxiosPublic()
  const {data: pendingRequests = []} = useQuery({
    queryKey: ['pendingRequests'],
    queryFn: async() => {
      const res = await axiosPublic.get('/pendingRequests',{
        params: { status: 'pending' }
    });
      return res.data
    }
  })
  //console.log(pendingRequests)

  return (
    <div>
      <Helmet>
        <title>Donation Requests | DonateLife</title>
      </Helmet>
      <div className="pt-20">
        <div className="p-4">
          <h2 className="text-center text-blue-600 text-xl">
            Here are all pending Blood Donation Requests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {
              pendingRequests.map(request => 
                <section key={request._id}
                className="p-4 mx-auto">
                  <div className="mx-auto w-fit">
                    <motion.div
                      whileHover="hover" transition={{duration: 1, ease: "backInOut"}}
                      variants={{ hover: {  scale: 1.05 } }}
                      className="relative h-96 w-72 shrink-0 overflow-hidden rounded-xl bg-blue-500 p-8"
                    >
                      <div className="relative z-10 text-white">
                        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
                          {request.recipientBloodGroup}
                        </span>
                        <motion.span
                          initial={{ scale: 0.85 }} variants={{ hover: { scale: 1} }}
                          transition={{ duration: 1, ease: "backInOut"}}
                          className="my-2 block origin-top-left  text-lg font-bold leading-[1.2]"
                        >
                          Recipient Name: {request.recipientName} <br /> <br />
                          Donation Date: {request.donationDate} <br /> <br />
                          Donation Time: {request.donationTime} <br /> <br />
                          Location: {request.recipientUpazila},{request.recipientDistrict} <br /> <br />
                        </motion.span>
                      </div>
                      <Link to={`/requestDetails/${request._id}`} className="absolute bottom-4 left-4 right-4 z-20 rounded border-2 border-white bg-white py-2 text-center font-mono font-black uppercase text-neutral-800 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
                        View Request
                      </Link>
                      <Background />
                    </motion.div>
                  </div>
                </section>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};

export default DonationRequest;