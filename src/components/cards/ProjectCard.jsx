import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const hasLink = Boolean(project.webapp && project.webapp !== "#");
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="group w-[330px] h-[500px] bg-[#0b1222]/85 border border-cyan-400/15 rounded-xl shadow-[0_8px_24px_rgba(2,8,23,0.5)] p-4 overflow-hidden cursor-pointer flex flex-col transition-all duration-300 ease-in-out hover:shadow-[0_0_32px_rgba(34,211,238,0.25)] hover:border-cyan-300"
    >
      <div className="h-36 w-full overflow-hidden rounded-lg shadow relative">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/0 via-cyan-200/0 to-white/0 group-hover:from-cyan-500/10 group-hover:via-white/5 group-hover:to-emerald-400/15 transition-all duration-500" />
      </div>

      <div className="flex flex-col justify-between flex-grow mt-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, index) => (
            <motion.span
              key={`tag${index}`}
              whileHover={{ scale: 1.05 }}
              className="flex text-sm items-center gap-2 border border-white/10 bg-[#0f172a] p-2 rounded-lg shadow-sm transition-transform duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {project.date && (
            <span className="text-sm text-slate-400">{project.date}</span>
          )}
          <p className="text-sm text-slate-300 mt-1 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-4">
          {hasLink ? (
            <motion.a
              href={project.webapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="inline-block w-full text-center bg-cyan-400 text-slate-950 px-4 py-2 rounded-md hover:bg-emerald-300 transition-colors duration-200 font-semibold"
            >
              View Live
            </motion.a>
          ) : (
            <span className="inline-block w-full text-center bg-white/10 text-slate-300 px-4 py-2 rounded-md border border-white/10">
              Private Project
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
