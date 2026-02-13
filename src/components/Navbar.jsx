import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { HiMenu, HiX } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

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
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

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
        <ul className="gap-2 list-none hidden md:flex items-center">
          {menuItem.map((menu) => (
            <li key={menu.name} className="relative">
              <ScrollLink
                to={menu.redirect}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onSetActive={() => setActiveSection(menu.redirect)}
                onClick={() => setActiveSection(menu.redirect)}
                className={`relative z-10 font-medium transition-all duration-300 cursor-pointer px-2 py-2 border-b-2 ${
                  activeSection === menu.redirect
                    ? "text-cyan-200 border-cyan-300"
                    : "text-slate-200 border-transparent hover:text-white hover:border-cyan-400/70"
                }`}
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
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="h-11 w-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center active:scale-95 transition-transform"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden fixed inset-0 top-20 z-40 bg-black/35 backdrop-blur-[1px]"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="md:hidden fixed inset-x-0 top-20 z-50 px-4"
            >
              <div className="max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#070b14]/95 backdrop-blur-md p-4 shadow-[0_14px_40px_rgba(2,8,23,0.5)]">
                <ul className="flex flex-col gap-2">
                  {menuItem.map((menu) => (
                    <li key={menu.name}>
                      <ScrollLink
                        to={menu.redirect}
                        spy={true}
                        onClick={() => {
                          setActiveSection(menu.redirect);
                          setIsOpen(false);
                        }}
                        onSetActive={() => setActiveSection(menu.redirect)}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className={`block font-medium cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 ${
                          activeSection === menu.redirect
                            ? "text-cyan-200 border border-cyan-300/60 bg-cyan-400/10"
                            : "text-slate-100 border border-transparent hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {menu.name}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2 pt-4">
                  <a
                    href="https://github.com/theashutoshpandey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-cyan-400 bg-transparent text-cyan-300 rounded-full cursor-pointer px-4 py-2.5 text-center text-sm font-medium transition-colors duration-200 hover:bg-cyan-400 hover:text-slate-950"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashutosh-pandey-7b9424221/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-emerald-400 bg-transparent text-emerald-300 rounded-full cursor-pointer px-4 py-2.5 text-center text-sm font-medium transition-colors duration-200 hover:bg-emerald-400 hover:text-slate-950"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
