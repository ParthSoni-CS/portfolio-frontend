import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const isCaseStudyDetailPage = location.pathname.includes('/case-studies/');

  // Handle navigation to hash sections
  const handleScrollToSection = (sectionId, event) => {
    event.preventDefault();
    
    // Close the mobile menu when a link is clicked
    setMenuOpen(false);
    
    if (location.pathname === "/") {
      // We're already on the homepage, just scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // We need to navigate to homepage first, then append hash
      window.location.href = `/#${sectionId}`;
    }
  };
  
  if (!menuOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-30 md:hidden flex flex-col">
      <div className="flex justify-end p-4">
        <button 
          onClick={() => setMenuOpen(false)}
          className="text-3xl font-light"
          aria-label="Close menu"
        >
          &times;
        </button>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow space-y-8 text-xl">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-black transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        
        {/* Hide these links on case study detail pages */}
        {!isCaseStudyDetailPage && (
          <>
            <a 
              href="#about" 
              onClick={(e) => handleScrollToSection("about", e)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              About
            </a>
            <a 
              href="#projects" 
              onClick={(e) => handleScrollToSection("projects", e)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Projects
            </a>
            <a 
              href="#case-studies" 
              onClick={(e) => handleScrollToSection("case-studies", e)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Case Studies
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleScrollToSection("contact", e)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              Contact
            </a>
          </>
        )}
      </div>
    </div>
  );
};