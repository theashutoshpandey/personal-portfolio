import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      setScrollProgress(progress);
      setShowButton(scrollTop > 520);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(rgba(34,211,238,0.95) ${scrollProgress}%, rgba(255,255,255,0.14) ${scrollProgress}% 100%)`,
    }),
    [scrollProgress]
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="fixed right-5 bottom-5 md:right-7 md:bottom-7 z-40 rounded-full p-[2px] shadow-[0_14px_34px_rgba(2,8,23,0.5)] hidden sm:block"
          style={ringStyle}
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#08101f]/90 backdrop-blur-md border border-white/15 text-cyan-200">
            <HiArrowUp size={20} />
            <span className="absolute inset-0 rounded-full shadow-[inset_0_0_18px_rgba(34,211,238,0.18)]" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
