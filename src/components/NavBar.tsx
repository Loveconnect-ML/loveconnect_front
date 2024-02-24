import React from "react";
import { motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
};

function NavBar({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center text-3xl px-8 w-full rounded-full border-[6px] border-black"
    >
      {children}
    </motion.div>
  );
}

export default NavBar;
