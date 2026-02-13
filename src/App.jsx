import React from "react"
import { MotionConfig } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skiils from "./components/Skiils";
import Experience from "./components/Experience";
import Education from "./components/Education";
import StyledStarCanvas from "./components/canvas/star";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import BackToTop from "./components/BackToTop";

function App() {
  return (

    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <CustomCursor />
      <BackToTop />
      <Navbar />

      <div className="bg-[#05070f] w-full overflow-x-hidden relative min-h-screen scroll-smooth">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <StyledStarCanvas />
        </div>

        <div>
          <Hero />

          <div
            className="w-full pb-16"
            style={{
              backgroundImage: `
        linear-gradient(35deg, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 55%),
        linear-gradient(140deg, rgba(74,222,128,0.16) 0%, rgba(74,222,128,0) 65%)
      `,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%)',
            }}
          >
            <Skiils />
            <Experience />
          </div>

          <Project />

          <div
            className="w-full pb-16"
            style={{
              backgroundImage: `
        linear-gradient(35deg, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0) 55%),
        linear-gradient(140deg, rgba(74,222,128,0.16) 0%, rgba(74,222,128,0) 65%)
      `,
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%)',
            }}
          >
            <Education />
            <Contact />
          </div>

          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
