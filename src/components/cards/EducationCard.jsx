import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

export default function EducationCard({ education }) {
  return (
    <VerticalTimelineElement
      className="timeline-edu-card"
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
          src={education.img}
          alt={education.college}
        />
      }
      contentStyle={{
        background:
          "radial-gradient(circle at top right, rgba(74,222,128,0.14), rgba(5,10,22,0.97) 46%)",
        color: "#fff",
        boxShadow: "0 12px 34px rgba(2, 8, 23, 0.72)",
        border: "1px solid rgba(74, 222, 128, 0.32)",
        borderRadius: "18px",
        padding: "24px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(74, 222, 128, 0.38)",
      }}
      date={
        <span className="inline-flex items-center rounded-full border border-emerald-300/45 bg-emerald-400/12 px-3 py-1 text-xs md:text-sm text-emerald-100 font-semibold shadow-[0_0_10px_rgba(74,222,128,0.2)]">
          {education.date}
        </span>
      }
    >
      <div className="text-left">
        <div className="inline-flex items-center rounded-full border border-emerald-300/35 bg-emerald-400/10 px-3 py-1 text-[11px] tracking-[0.15em] uppercase text-emerald-200 mb-3 transition-colors duration-300">
          Education
        </div>
        <div className="text-lg md:text-lg font-semibold text-slate-50">
          {education.college}
        </div>
        <div className="text-md md:text-md text-slate-100/95 font-medium">{education.degree}</div>

        {education?.grade && (
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="font-semibold text-sm text-slate-100">Grade:</span>
            <span className="text-sm text-emerald-100 bg-emerald-400/12 border border-emerald-300/35 px-3 py-1 rounded-full">
              {education.grade}
            </span>
          </div>
        )}
        {education.desc && (
          <p className="mt-2 text-sm md:text-base text-left text-slate-100/95 leading-relaxed">
            {education.desc}
          </p>
        )}
      </div>
    </VerticalTimelineElement>
  );
}
