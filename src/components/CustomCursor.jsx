import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const trailingRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mediaQuery.matches;

    const updatePosition = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const animateTrail = () => {
      const followStrength = reduceMotionRef.current ? 1 : 0.16;
      trailingRef.current = {
        x:
          trailingRef.current.x +
          (targetRef.current.x - trailingRef.current.x) * followStrength,
        y:
          trailingRef.current.y +
          (targetRef.current.y - trailingRef.current.y) * followStrength,
      };
      setTrailingPosition(trailingRef.current);
      frameRef.current = window.requestAnimationFrame(animateTrail);
    };

    frameRef.current = window.requestAnimationFrame(animateTrail);
    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] bg-[rgba(34,211,238,0.35)] shadow-[0_0_18px_rgba(34,211,238,0.55),0_0_36px_rgba(74,222,128,0.25)] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ease-out backdrop-blur-[2px] border border-white/15 hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`fixed top-0 left-0 w-2 h-2 bg-[#22d3ee] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-out hidden md:block ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: `${trailingPosition.x}px`, top: `${trailingPosition.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
