import React from "react";
import Typewriter from "typewriter-effect";
import { Bio } from "../data/constants";
import devPic from "../assets/hero-portrait.png";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../utils/motion";
import StyledStarCanvas from "./canvas/star";
import HeroBgAnimation from "../HeroBgAnimation/HeroBgAnimation";

export default function Hero() {
  return (
    <React.Fragment>
      <div
        id="home"
        className="heroContainer flex justify-center items-center px-6 md:px-10 py-4 md:py-12 relative text-white"
      >
        <div className="absolute right-0 bottom-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1240px] justify-end flex">
          <StyledStarCanvas />
          <HeroBgAnimation />
        </div>
        <motion.div {...headContainerAnimation}>
          <div className="heroInner flex flex-col md:flex-row justify-between items-center w-full max-w-[1100px] gap-8">
            <div className="heroLeft w-full md:w-1/2 order-2 md:order-1 flex flex-col gap-5 md:items-start items-center text-center md:text-left z-10">
              <motion.div {...headTextAnimation}>
                <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-cyan-300 mb-1">
                  Backend - Java - Problem Solver
                </p>
                <h1 className="font-display font-bold text-3xl md:text-5xl leading-snug">
                  Hi, I&apos;m <span className="text-cyan-300">Ashutosh Pandey</span>
                </h1>

                <div className="font-semibold text-lg inline-flex items-center justify-center md:justify-start mt-1">
                  <span className="text-slate-300 pr-1">I&apos;m a</span>
                  <span className="text-emerald-300 pl-1">
                    <Typewriter
                      options={{
                        strings: Bio.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </span>
                </div>
              </motion.div>
              <motion.div {...headContentAnimation}>
                <p className="text-sm md:text-base leading-relaxed max-w-md text-slate-300">
                  {Bio.description}
                </p>
              </motion.div>
              <motion.div {...headContentAnimation}>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href="https://github.com/theashutoshpandey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-white/20 text-slate-100 px-5 py-3 rounded-full text-sm font-medium hover:border-cyan-300 hover:text-cyan-200 hover:bg-white/5 cursor-pointer transition duration-300"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashutosh-pandey-7b9424221/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-emerald-400 text-emerald-300 px-5 py-3 rounded-full text-sm font-medium hover:bg-emerald-400/10 cursor-pointer transition duration-300"
                  >
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="heroRight w-full md:w-1/2 order-1 md:order-2 flex justify-end items-end z-10">
              <motion.div {...headContentAnimation}>
                <div className="transition-transform duration-300 ease-out hover:scale-[1.02] hover:-rotate-1">
                  <img src={devPic} alt="Ashutosh Pandey" className="w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </React.Fragment>
  );
}
