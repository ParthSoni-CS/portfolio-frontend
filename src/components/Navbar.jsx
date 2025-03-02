import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const isCaseStudyDetailPage = location.pathname.includes('/case-studies/');
  
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Handle navigation to hash sections
  const handleScrollToSection = (sectionId, event) => {
    event.preventDefault();
    
    // Handle navigation differently based on current page
    if (location.pathname === "/") {
      // We're already on the homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // We need to navigate to homepage first, then append hash
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgba(255,255,255,0.9)] backdrop-blur-lg border-b border-gray-300 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-mono text-xl font-bold text-gray-900">
            parth<span className="text-blue-500">.soni</span>
          </Link>
          <div
            className="w-7 h-5 relative cursor-pointer z-40 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            &#9776;
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {/* Always show Home link */}
            <Link to="/" className="text-gray-600 hover:text-black transition-colors">
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
      </div>
    </nav>
  );
};