import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Delay trailing cursor slightly for fluid effect
      setTimeout(() => {
        setTrailingPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    window.addEventListener('mousemove', updatePosition);

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] bg-[rgba(34,211,238,0.35)] shadow-[0_0_18px_rgba(34,211,238,0.55),0_0_36px_rgba(74,222,128,0.25)] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out backdrop-blur-[2px] border border-white/15 hidden md:block"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#22d3ee] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out hidden md:block"
        style={{ left: `${trailingPosition.x}px`, top: `${trailingPosition.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
