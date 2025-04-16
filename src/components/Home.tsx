import { splitCharacters } from "../services/utils";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  useEffect(() => {
    gsap.fromTo(
      ["#hero-heading", "#hero-subheading", "#hero-button"],
      {
        y: 50,
        opacity: 0,
      },
      { y: 0, opacity: 1, duration: 1.4, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="h-screen w-full flex justify-center items-center relative">
      <motion.div
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center flex-col"
      >
        <motion.h1
          id="hero-heading"
          className="text-8xl font-extralight mb-6 text-center leading-[1.2] max-md:text-6xl"
        >
          I'm <span className="italic font-bold text-gray-700">Aiko</span>{" "}
          <span className="inline-block object-cover w-32 h-20 overflow-hidden rounded-full border-2 border-slate-800  max-md:w-24  max-md:h-13">
            <img src="/me.webp" className="object-cover h-full w-full" />
          </span>
          ,
          <br className="max-[480px]:hidden" />a Manga{" "}
          <span className="inline-block object-cover w-32 h-20 overflow-hidden rounded-full border-2 border-slate-800 max-md:w-24  max-md:h-13">
            <img src="/bg.webp" className="object-cover h-full" />
          </span>{" "}
          <span className="italic font-bold text-gray-700">Artist</span>
          <br className="max-[480px]:hidden" /> based in Tokyo{" "}
          <span className="inline-block object-cover w-32 h-20 overflow-hidden rounded-full border-2 border-slate-800 max-md:w-24  max-md:h-13">
            <img src="/tokyo.webp" />
          </span>
        </motion.h1>
        <motion.p
          id="hero-subheading"
          className="text-2xl mb-8 text-gray-500 text-center max-md:text-xl"
        >
          Bringing narratives to life through expressive illustration
        </motion.p>

        <Link to="/projects">
          <button id="hero-button" className="btn">
            Explore Work
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
