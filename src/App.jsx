import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { CaseStudiesPage } from "./components/CaseStudiesPage";
import { CaseStudyDetail } from "./components/CaseStudyDetail";
import { Contact } from "./components/sections/Contact";
import { AdminUploadForm } from "./components/AdminUploadForm";
import "./index.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Check if we're on the admin page by examining the current URL
  const isAdminPage = window.location.pathname.includes('/admin');
  
  // If we're on the admin page, immediately set isLoaded to true to skip animation
  useEffect(() => {
    if (isAdminPage) {
      setIsLoaded(true);
    }
  }, [isAdminPage]);

  return (
    <Router basename="/">
      {!isLoaded && !isAdminPage && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-white text-gray-900`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Projects />
                <CaseStudiesPage />
                <Contact />
              </>
            }
          />
          <Route path="/admin/upload" element={<AdminUploadForm />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;