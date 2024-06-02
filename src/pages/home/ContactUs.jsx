import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ContactUs = () => {
  const axiosPublic = useAxiosPublic()

  const handleContactUs = event => {
    event.preventDefault();
    
    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const contactData = { name, email, message }
    console.log(contactData)

    axiosPublic.post("/contactUs", contactData)
    .then(res => {
      console.log(res.data)
      if(res.data.insertedId){
        Swal.fire({
          title: 'Successful!',
          text: 'Message Stored In Database!',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      }
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
    form.reset();
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleContactUs}
            className=" p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <div className="mb-4">
                <label className="block  mb-2" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text" name="name" placeholder="Your Name"
                  className="w-full input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block  mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  type="email" name="email" placeholder="Your Email"
                  className="w-full input input-bordered rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2" htmlFor="message">
                  Message:
                </label>
                <textarea
                  name="message" placeholder="Your Message"
                  className="w-full textarea textarea-bordered rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <motion.input
                whileHover={{scale: 1.1}} whileTap={{scale: 0.75}}
                type="submit" value="Send Message"
                className="w-full input input-bordered bg-blue-500 text-white font-semibold rounded-md transition-colors hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              />
            </form>
          </motion.div>
          
          <motion.div
            className="w-full md:w-1/2 md:ml-4"
            whileHover={{scale: 1.1}} whileTap={{scale: 0.75}}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className=" p-6 rounded-md shadow-md border-2">
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <p className="mb-2 ">Phone: +1 234 567 890</p>
              <p className="mb-2 ">Email: info@blooddonation.com</p>
              <p>Address: 123 DonateLife St., Chattogram, Bangladesh</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;