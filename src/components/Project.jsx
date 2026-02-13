import React, { useState } from "react";
import { projects } from "../data/constants";
import ProjectCard from "./cards/ProjectCard";
import { motion } from "framer-motion";

export default function Project() {
  const [selectedType, setSelectedType] = useState("all");

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
        className="flex gap-4 mb-8 px-4"
      >
        <button
          onClick={() => setSelectedType("all")}
          className={`px-4 py-2 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 ${
            selectedType === "all"
              ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.45)]"
              : "bg-transparent text-cyan-300 border-solid border-2 border-cyan-400 hover:bg-cyan-400/10"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedType("professional")}
          className={`px-4 py-2 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 ${
            selectedType === "professional"
              ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.45)]"
              : "bg-transparent text-cyan-300 border-solid border-2 border-cyan-400 hover:bg-cyan-400/10"
          }`}
        >
          Professional
        </button>
        <button
          onClick={() => setSelectedType("open-source")}
          className={`px-4 py-2 rounded-full cursor-pointer text-sm md:text-base transition-all duration-300 ${
            selectedType === "open-source"
              ? "bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.45)]"
              : "bg-transparent text-cyan-300 border-solid border-2 border-cyan-400 hover:bg-cyan-400/10"
          }`}
        >
          Open Source
        </button>
      </motion.div>
      <div className="flex justify-center items-stretch gap-6 flex-wrap max-w-[1100px] px-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={`project${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        ) : (
          <p className="text-slate-400">
            No projects available for this category.
          </p>
        )}
      </div>
    </div>
  );
}
