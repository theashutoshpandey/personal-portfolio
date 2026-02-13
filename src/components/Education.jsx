import React from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { education } from "../data/constants";
import EducationCard from "./cards/EducationCard";
import EathCanvas from "./canvas/Earth";
import { motion } from "framer-motion";

export default function Education() {
  return (
    <div
      id="education"
      className="flex flex-col items-center justify-center py-16 text-white relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="w-full max-w-[1100px] text-center pb-2 px-4"
      >
        <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-cyan-300 mb-2">
          Academic Path
        </p>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Education
        </h3>
        <p className="text-md md:text-lg text-slate-300 pb-6">
          An overview of my academic background and qualifications.
        </p>
      </motion.div>

      <div className="w-full max-w-[1100px] px-4">
        <VerticalTimeline lineColor="rgba(74, 222, 128, 0.32)">
          {education.map((item, index) => (
            <EducationCard key={`education-${index}`} education={item} />
          ))}
        </VerticalTimeline>
      </div>
      <EathCanvas />
    </div>
  );
}
