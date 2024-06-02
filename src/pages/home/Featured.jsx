/* eslint-disable react/prop-types */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export const Featured = () => {
  return (
    <div>
      <TextParallaxContent
        imgUrl="https://i.ibb.co/m8KvDpN/f-1.jpg"
        subheading="Donate Blood!"
        heading="Be A Friend! A Saviour!"
      >
        <Content1 />
      </TextParallaxContent>
      
      <TextParallaxContent
        imgUrl="https://i.ibb.co/dphXHnz/f-2.webp"
        subheading="Need Blood!"
        heading="Quickly Search For A Donor."
      >
        <Content2 />
      </TextParallaxContent>
      
      <TextParallaxContent
        imgUrl="https://i.ibb.co/DG43nZV/f-5.png"
        subheading="Read Blogs!"
        heading="Learn About Blood Donation."
      >
        <Content3 />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const Content1 = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
        Be a Friend! Be a Saviour!
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl md:text-2xl">
          Every drop counts. By donating blood, you can save lives and be a true
          hero. Join us in this noble cause and make a difference in someones
          life.
        </p>
        <p className="mb-8 text-xl md:text-2xl">
          Your contribution matters. With your help, we can ensure that there is
          always enough blood available for those in need. Together, let us be the
          change we wish to see in the world.
        </p>
        <Link to="/donationRequests" className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
          Goto Donation Requests <FiArrowUpRight className="inline" />
        </Link>
      </div>
    </div>
);

const Content2 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Need Blood Quickly? Search for a Donor Now!
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl">
        In urgent need of blood? Our platform connects you with donors quickly
        and efficiently. Save precious time and lives by finding a donor near you.
      </p>
      <p className="mb-8 text-xl md:text-2xl">
        Our network of donors is always ready to help in emergencies. Do not wait
        when every second counts. Search for a blood donor now and get the help
        you need immediately.
      </p>
      <Link to="/search" className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Search Donors <FiArrowUpRight className="inline" />
      </Link>
    </div>
  </div>
);

const Content3 = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Read Blogs. Learn About Blood Donation.
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl md:text-2xl">
        Discover the importance of blood donation through our extensive collection of blogs. Learn about the impact of donating blood and how it saves lives.
      </p>
      <p className="mb-8 text-xl md:text-2xl">
        Our blogs provide insights, stories, and essential information on blood donation. Educate yourself and become a part of the life-saving community.
      </p>
      <Link to="/blogs" className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        To Blogs <FiArrowUpRight className="inline" />
      </Link>
    </div>
  </div>
);