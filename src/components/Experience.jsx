import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../data/constants";
import ExperienceCard from "./cards/ExperienceCard";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <div
      id="experience"
      className="flex flex-col items-center justify-center py-16 text-white relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="w-full max-w-[1100px] text-center mb-8 px-4"
      >
        <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-cyan-300 mb-2">
          Career Journey
        </p>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Experience
        </h3>
        <p className="text-md md:text-lg text-slate-200">
          A look at the companies I have worked with and the impactful roles I
          have taken on.
        </p>
      </motion.div>
      <div className="w-full max-w-[1100px] px-4">
        <VerticalTimeline lineColor="rgba(34, 211, 238, 0.35)">
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}
