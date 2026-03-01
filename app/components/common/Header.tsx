import { useEffect, useState } from "react";
import headerLogo from "../../assets/Header/header-logo.svg";

const navLinks = [
  { label: "Section 1", href: "#section-1" },
  { label: "Section 2", href: "#section-2" },
  { label: "Section 3", href: "#section-3" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Using document.documentElement.scrollTop for better compatibility with Lenis
      setScrolled(document.documentElement.scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300  ${
        scrolled
          ? "bg-cloud-white/90 shadow-md backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <img src={headerLogo} alt="Blue Sky logo" className="h-7 w-auto" />
        </div>

        {/* Nav Sections */}
        <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="pointer-events-auto text-sm font-semibold text-navy-dark transition-colors duration-150 hover:text-accent-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action buttons — desktop */}
        <div className="hidden md:flex shrink-0 items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-navy-dark/30 bg-transparent px-4 py-1.5 text-xs font-semibold text-navy-dark backdrop-blur-sm transition-all duration-200 hover:bg-accent-orange hover:border-accent-orange hover:text-white hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            Customer Support
          </button>
          <button className="flex items-center gap-1.5 rounded-md border border-navy-dark/30 bg-transparent px-4 py-1.5 text-xs font-semibold text-navy-dark backdrop-blur-sm transition-all duration-200 hover:bg-accent-orange hover:border-accent-orange hover:text-white hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Help
          </button>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 text-navy-dark hover:cursor-pointer"
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-navy-dark rounded-full" />
          <span className="block w-6 h-0.5 bg-navy-dark rounded-full" />
          <span className="block w-6 h-0.5 bg-navy-dark rounded-full" />
        </button>
      </div>
    </header>
  );
};

export default Header;
