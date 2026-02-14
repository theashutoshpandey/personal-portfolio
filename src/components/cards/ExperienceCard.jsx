import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

export default function ExperienceCard({ experience }) {
  return (
    <VerticalTimelineElement
      className="timeline-exp-card"
      icon={
        <img
          width="100%"
          height="100%"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            transform: "scale(1.12)",
            transformOrigin: "center"
          }}
          src={experience.img}
          alt={experience.company}
        />
      }
      contentStyle={{
        background:
          "radial-gradient(circle at top right, rgba(34,211,238,0.12), rgba(5,10,22,0.97) 45%)",
        color: "#fff",
        boxShadow: "0 12px 34px rgba(2, 8, 23, 0.72)",
        border: "1px solid rgba(34, 211, 238, 0.34)",
        borderRadius: "18px",
        padding: "24px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(34, 211, 238, 0.45)",
      }}
      date={
        <span className="inline-flex items-center rounded-full border border-cyan-300/45 bg-cyan-400/12 px-3 py-1 text-xs md:text-sm text-cyan-100 font-semibold shadow-[0_0_10px_rgba(34,211,238,0.2)]">
          {experience.date}
        </span>
      }
    >
      <div className="text-left">
        <div className="inline-flex items-center rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-[11px] tracking-[0.15em] uppercase text-cyan-200 mb-3 transition-colors duration-300">
          Experience
        </div>
        <div className="text-lg md:text-xl font-bold text-slate-50">
          {experience.role}
        </div>
        <div className="text-sm md:text-base text-slate-200 font-medium">{experience.company}</div>

        {experience.desc && (
          <p className="mt-3 text-sm md:text-base text-left text-slate-100/95 leading-relaxed">
            {experience.desc}
          </p>
        )}

        {experience.skills?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="font-semibold text-sm text-slate-100">Skills:</span>
            {experience.skills.map((skill, index) => (
              <span
                key={`skill-${index}`}
                className="text-xs md:text-sm text-cyan-100 bg-cyan-400/14 border border-cyan-300/38 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.2)]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
}
