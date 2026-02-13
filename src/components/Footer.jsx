import React from "react";
import { Link as ScrollLink } from "react-scroll";

export default function Footer() {
  const menuItem = [
    { name: "Home", redirect: "home" },
    { name: "Skills", redirect: "skills" },
    { name: "Experience", redirect: "experience" },
    { name: "Projects", redirect: "projects" },
    { name: "Education", redirect: "education" },
    { name: "Contact", redirect: "contact" },
  ];

  return (
    <footer className="text-white py-4 relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        <h2 className="text-3xl text-cyan-300 font-display font-semibold tracking-wider">
          Ashutosh Pandey
        </h2>
        <ul className="flex flex-wrap justify-center gap-6 md:text-lg sm:text-[12px]">
          {menuItem.map((menu, index) => (
            <li key={`menu-${index}`}>
              <ScrollLink
                to={menu.redirect}
                smooth={true}
                duration={500}
                offset={-80}
                className="hover:text-cyan-300 transition-colors duration-200 cursor-pointer"
              >
                {menu.name}
              </ScrollLink>
            </li>
          ))}
        </ul>
        <div className="w-full border-t border-white/10 my-2" />
        <p className="text-xs text-slate-400 text-center">
          &copy; {new Date().getFullYear()} Ashutosh Pandey. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
