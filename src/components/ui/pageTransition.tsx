// components/ui/pageTransition.tsx
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: 300 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -300 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export { PageTransition };
