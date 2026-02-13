import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { HiMenu, HiX } from "react-icons/hi";

const menuItem = [
  { name: "Home", redirect: "home" },
  { name: "Skills", redirect: "skills" },
  { name: "Experience", redirect: "experience" },
  { name: "Projects", redirect: "projects" },
  { name: "Education", redirect: "education" },
  { name: "Contact", redirect: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return newState;
    });
  };

  return (
    <React.Fragment>
      <div className="backdrop-blur-md bg-[#070b14]/70 border-b border-white/5 text-white h-20 sticky top-0 z-20 flex items-center justify-between px-6 md:px-8">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          offset={-80}
          className="text-white text-2xl font-semibold tracking-wide whitespace-nowrap cursor-pointer font-display"
        >
          Ashutosh Pandey
        </ScrollLink>

        {/* Menu Items */}
        <ul className="gap-6 list-none hidden md:flex">
          {menuItem.map((menu) => (
            <li key={menu.name}>
              <ScrollLink
                to={menu.redirect}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                activeClass="text-cyan-300 border-b-2 border-cyan-400"
                className="text-white font-medium hover:text-cyan-300 transition-colors duration-300 cursor-pointer pb-1"
              >
                {menu.name}
              </ScrollLink>
            </li>
          ))}
        </ul>

        {/* Social buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/theashutoshpandey"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cyan-400 bg-transparent text-cyan-300 rounded-3xl cursor-pointer px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200 hover:bg-cyan-400 hover:text-slate-950"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ashutosh-pandey-7b9424221/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-emerald-400 bg-transparent text-emerald-300 rounded-3xl cursor-pointer px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
          >
            LinkedIn
          </a>
        </div>
        {/* Humburger menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-5 bg-[#070b14]/95 backdrop-blur-md relative z-50">
          <ul className="flex flex-col gap-4">
            {menuItem.map((menu) => (
              <li key={menu.name}>
                <ScrollLink
                  to={menu.redirect}
                  onClick={() => setIsOpen(false)}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="block text-white font-medium hover:text-cyan-300 cursor-pointer"
                >
                  {menu.name}
                </ScrollLink>
              </li>
            ))}

            {/* GitHub Button for mobile */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="https://github.com/theashutoshpandey"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cyan-400 bg-transparent text-cyan-300 rounded-3xl cursor-pointer px-4 py-2 text-center text-sm font-medium transition-colors duration-200 hover:bg-cyan-400 hover:text-slate-950"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ashutosh-pandey-7b9424221/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-emerald-400 bg-transparent text-emerald-300 rounded-3xl cursor-pointer px-4 py-2 text-center text-sm font-medium transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
              >
                LinkedIn
              </a>
            </div>
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}
