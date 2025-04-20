import { motion } from "framer-motion";

const Transition = () => {
  return (
    <>
      <motion.div
        exit={{ display: "block", bottom: 0 }}
        className="transitions"
      >
        <motion.div
          style={{ top: window.scrollY + window.innerHeight }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.6 }}
          className="transition-box transition-box1"
        ></motion.div>
        <motion.div
          style={{ top: window.scrollY + window.innerHeight }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="transition-box transition-box2"
        ></motion.div>
        <motion.div
          style={{ top: window.scrollY + window.innerHeight }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.3, delay: 0.2 }}
          className="transition-box transition-box3"
        ></motion.div>
      </motion.div>
    </>
  );
};

export default Transition;
