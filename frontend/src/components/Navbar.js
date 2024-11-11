import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  Home,
  Info,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState(null);
  const location = useLocation(); // Replaces `usePathname` in Next.js

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Accommodation",
      href: "/accommodation",
      icon: Briefcase,
      submenu: [
        { name: "Room 1", href: "/accommodation/room-1" },
        { name: "Room 2", href: "/accommodation/room-2" },
        { name: "Room 3", href: "/accommodation/room-3" },
      ],
    },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const navbarVariants = {
  //   hidden: { opacity: 0, y: -20 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  // };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <nav
      className={`bg-white px-4 xl:px-0 py-4 sticky top-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <h1 className="text-primary">Adam’s Pension</h1>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                variants={menuItemVariants}
                custom={index}
                className="relative group"
              >
                <Link
                  to={item.href}
                  className={`hover:text-primary transition duration-300 ease-in-out text-lg font-medium relative group flex items-center ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-primary-dark"
                  }`}
                  onMouseEnter={() =>
                    item.submenu && setActiveSubmenu(item.name)
                  }
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ease-in-out ${
                      location.pathname === item.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
                {item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-60 bg-white rounded-md shadow-lg py-2 z-10"
                        onMouseEnter={() => setActiveSubmenu(item.name)}
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white transition duration-150 ease-in-out"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none text-gray-600 hover:text-primary transition duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-y-0 left-0 w-64 bg-white text-gray-700 shadow-2xl z-50 md:hidden h-screen overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <Link
                  to="/"
                  className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  <h1 className="text-primary">Adam’s Mansion</h1>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-primary transition duration-300 ease-in-out focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex justify-between items-center text-lg py-2 px-4 rounded-lg transition-all duration-300 ease-in-out ${
                        location.pathname === item.href
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 hover:text-primary"
                      }`}
                      onClick={() => {
                        if (!item.submenu) {
                          setIsOpen(false);
                        } else {
                          setExpandedSubmenu(
                            expandedSubmenu === item.name ? null : item.name
                          );
                        }
                      }}
                    >
                      <div className="flex gap-4 items-center">
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </div>

                      {item.submenu && (
                        <ChevronDown
                          className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                            expandedSubmenu === item.name
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </Link>

                    {/* Submenu for mobile */}
                    {item.submenu && expandedSubmenu === item.name && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="mt-2 space-y-2 ml-4 overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block py-2 px-4 text-sm text-gray-600 hover:text-primary transition duration-150 ease-in-out"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
