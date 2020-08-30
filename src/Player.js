import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Player = ({ isToggled, setToggle, children }) => {
  return (
    <AnimatePresence>
      {isToggled && (
        <motion.div
          initial={{ opacity: 0, }}
          animate={{ opacity: 1, }}
          exit={{ opacity: 0, }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 1,
            transform: `translate3d(-50%, -50%, 0)`,
          }}
        >
          <motion.div initial={{ x: 50, rotate: -180 }} animate={{x: 0, rotate: 0 }} exit={{ x: 30, rotate: -180 }}>
            {/* <button onClick={() => setToggle(false)}>Close</button> */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Player;
