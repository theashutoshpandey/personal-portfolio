import React from "react";

export default function ProjectCard({ project }) {
  const hasLink = Boolean(project.webapp && project.webapp !== "#");
  return (
    <div className="w-[330px] h-[500px] bg-[#0b1222]/85 border border-cyan-400/15 rounded-xl shadow-[0_8px_24px_rgba(2,8,23,0.5)] p-4 overflow-hidden cursor-pointer flex flex-col transition-all duration-300 ease-in-out hover:shadow-[0_0_32px_rgba(34,211,238,0.25)] hover:-translate-y-2 hover:border-cyan-300">
      <div className="h-36 w-full overflow-hidden rounded-lg shadow">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow mt-4">
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, index) => (
            <span
              key={`tag${index}`}
              className="flex text-sm items-center gap-2 border border-white/10 bg-[#0f172a] p-2 rounded-lg shadow-sm hover:scale-105 transition-transform duration-300"
            >
              {tag}
            </span>
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
            <a
              href={project.webapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-cyan-400 text-slate-950 px-4 py-2 rounded-md hover:bg-emerald-300 transition-colors duration-200 font-semibold"
            >
              View Live
            </a>
          ) : (
            <span className="inline-block w-full text-center bg-white/10 text-slate-300 px-4 py-2 rounded-md border border-white/10">
              Private Project
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
