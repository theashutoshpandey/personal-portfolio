import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

export default function ExperienceCard({ experience }) {
  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={experience.img}
          alt={experience.img}
        />
      }
      contentStyle={{
        background: "rgba(8,16,30,0.85)",
        color: "#fff",
        boxShadow: "0 8px 28px rgba(2, 8, 23, 0.6)",
        border: "1px solid rgba(34, 211, 238, 0.2)",
        borderRadius: "14px",
        padding: "24px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(34, 211, 238, 0.35)",
      }}
      date={
        <span className="text-xs md:text-sm text-slate-400">
          {experience.date}
        </span>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 text-left">
        <img
          className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-contain border border-white/10"
          src={experience.img}
          alt={experience.img}
        />
        <div className="flex flex-col">
          <div className="text-lg md:text-xl font-bold text-slate-100">
            {experience.role}
          </div>
          <div className="text-sm md:text-base text-slate-400">
            {experience.company}
          </div>
        </div>
      </div>

      {experience.desc && (
        <p className="mt-3 text-sm md:text-base text-left text-slate-300 leading-relaxed">
          {experience.desc}
        </p>
      )}

      {experience.skills?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <span className="font-semibold text-sm text-slate-300">Skills:</span>
          {experience.skills.map((skill, index) => (
            <span
              key={`skill-${index}`}
              className="text-xs md:text-sm text-cyan-200 bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.18)]"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </VerticalTimelineElement>
  );
}
