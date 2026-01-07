import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-bold font-display leading-none text-white">
                LeapStart
              </span>
              <span className="block text-xs text-slate-400 font-medium tracking-wide">
                SCHOOL OF TECHNOLOGY
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold animate-pulse">
              ADMISSIONS 2026 OPEN
            </div>
            {["Why LeapStart", "Program", "Outcomes", "Journey"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {item}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection("booking")}
              className="bg-white text-background hover:bg-slate-200 font-bold"
            >
              Book Demo
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {["Why LeapStart", "Program", "Outcomes", "Journey"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
              className="text-left text-base font-medium text-slate-300 hover:text-white py-2"
            >
              {item}
            </button>
          ))}
          <Button 
            onClick={() => scrollToSection("booking")}
            className="w-full bg-primary text-white"
          >
            Book Free Demo
          </Button>
        </div>
      )}
    </nav>
  );
}
