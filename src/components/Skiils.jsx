import React from "react";
import { skills } from "../data/constants";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <div
      id="skills"
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
          Tech Stack
        </p>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Skills
        </h3>
        <p className="text-md md:text-lg text-slate-300">
          A categorized view of my backend, cloud, and real-time communication
          stack, including WebRTC, WebSocket, and Adobe Campaign Manager.
        </p>
      </motion.div>

      <div className="w-full max-w-[1100px] flex flex-wrap justify-between gap-6 px-4">
        {skills.map((category, idx) => (
          <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="w-full sm:w-[48%] bg-[rgba(10,18,36,0.7)] border border-cyan-400/20 shadow-[0_4px_24px_rgba(34,211,238,0.08)] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:border-cyan-300 hover:-translate-y-1"
            >
              <h4 className="text-xl text-white font-semibold mb-4">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 border border-white/10 bg-[#0f172a] p-2 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
                  >
                    {skill.image ? (
                      <img
                        src={skill.image}
                        alt={skill.name}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 flex items-center justify-center bg-cyan-500 rounded-full text-white text-sm font-bold">
                        {skill.name[0]}
                      </div>
                    )}
                    <p className="text-sm font-medium text-slate-200">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
}
