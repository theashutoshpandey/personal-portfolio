import React, { useState } from "react";
import { projects } from "../data/constants";
import ProjectCard from "./cards/ProjectCard";
import { AnimatePresence, motion } from "framer-motion";

export default function Project() {
  const [selectedType, setSelectedType] = useState("all");
  const tabs = [
    { id: "all", label: "All" },
    { id: "professional", label: "Professional" },
    { id: "open-source", label: "Open Source" },
  ];

  const filteredProjects =
    selectedType === "all"
      ? projects
      : projects.filter((project) => project.category === selectedType);

  return (
    <div
      id="projects"
      className="flex flex-col items-center justify-center py-16 text-white relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="w-full max-w-[1100px] text-center mb-8 px-4"
      >
        <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-cyan-300 mb-2">
          Work and Open Source
        </p>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Projects
        </h3>
        <p className="text-md md:text-lg text-slate-300">
          A mix of production-grade enterprise work and open-source projects,
          focused on reliability, security, and real-time experiences.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex gap-3 mb-8 px-4 flex-wrap justify-center"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`relative px-4 py-2 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 border ${
              selectedType === tab.id
                ? "text-slate-950 border-transparent"
                : "bg-transparent text-cyan-300 border-cyan-400 hover:bg-cyan-400/10"
            }`}
          >
            {selectedType === tab.id && (
              <motion.span
                layoutId="project-tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_24px_rgba(34,211,238,0.45)]"
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>
      <motion.div layout className="flex justify-center items-stretch gap-6 flex-wrap max-w-[1100px] px-4">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-slate-400"
            >
              No projects available for this category.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
