import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section 
    className="w-full px-8 py-24 min-h-screen
    grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-red-500 font-medium">
          Save Lives Today
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Be a Hero, Donate Blood
        </h3>
        <p className="text-base md:text-lg my-4 md:my-6">
          Your donation can make a difference. Join us in the fight against
          blood shortages and help those in need.
        </p>
        <Link to='/register' className="bg-red-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-red-600 active:scale-95">
          Join as a donor
        </Link>
        <Link to='/search' className="bg-red-500 ml-3 text-white font-medium py-2 px-4 rounded transition-all hover:bg-red-600 active:scale-95">
          Search Donors
        </Link>
      </div>

      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://i.ibb.co/k5yS1Q8/p-1.jpg",
  },
  {
    id: 2,
    src: "https://i.ibb.co/j6jDJ0n/p-2.jpg",
  },
  {
    id: 3,
    src: "https://i.ibb.co/GsLs1Gt/p-3.webp",
  },
  {
    id: 4,
    src: "https://i.ibb.co/4JxK2CQ/p-4.jpg",
  },
  {
    id: 5,
    src: "https://i.ibb.co/M5JVypc/p-5.jpg",
  },
  {
    id: 6,
    src: "https://i.ibb.co/w04szL0/p-6.jpg",
  },
  {
    id: 7,
    src: "https://i.ibb.co/rMGdwLd/p-7.jpg",
  },
  {
    id: 8,
    src: "https://i.ibb.co/JBxNRtx/p-8.jpg",
  },
  {
    id: 9,
    src: "https://i.ibb.co/k5yS1Q8/p-1.jpg",
  },
  {
    id: 10,
    src: "https://i.ibb.co/j6jDJ0n/p-2.jpg",
  },
  {
    id: 11,
    src: "https://i.ibb.co/GsLs1Gt/p-3.webp",
  },
  {
    id: 12,
    src: "https://i.ibb.co/4JxK2CQ/p-4.jpg",
  },
  {
    id: 13,
    src: "https://i.ibb.co/M5JVypc/p-5.jpg",
  },
  {
    id: 14,
    src: "https://i.ibb.co/w04szL0/p-6.jpg",
  },
  {
    id: 15,
    src: "https://i.ibb.co/rMGdwLd/p-7.jpg",
  },
  {
    id: 16,
    src: "https://i.ibb.co/JBxNRtx/p-8.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Banner;