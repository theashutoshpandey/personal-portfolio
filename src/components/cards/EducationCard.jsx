import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

export default function EducationCard({ education }) {
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
          src={education.img}
          alt={education.img}
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
        <span className="text-sm md:text-base text-slate-400">
          {education.date}
        </span>
      }
    >
      <div className="flex flex-col md:flex-row gap-4 text-left">
        <img
          className="h-16 w-16 md:h-15 md:w-15 rounded-xl object-contain border border-white/10"
          src={education.img}
          alt={education.img}
        />
        <div className="flex flex-col">
          <div className="text-lg md:text-lg font-semibold text-slate-200">
            {education.college}
          </div>
          <div className="text-md md:text-md text-slate-400">
            {education.degree}
          </div>
          <div className="text-sm text-slate-500">{education.date}</div>
        </div>
      </div>

      {education?.grade && (
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <span className="font-semibold text-sm text-slate-300">Grade:</span>
          {education.grade}
        </div>
      )}
      {education.desc && (
        <p className="mt-2 text-sm md:text-base text-left text-slate-400">
          {education.desc}
        </p>
      )}
    </VerticalTimelineElement>
  );
}
