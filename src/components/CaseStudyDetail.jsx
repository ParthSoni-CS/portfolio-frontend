import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../config';
import katex from "katex";
import "katex/dist/katex.min.css";

export const CaseStudyDetail = () => {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeHeading, setActiveHeading] = useState(null);
  const contentRef = useRef(null);
  const headingObserver = useRef(null);
  const scrollListenerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${config.apiUrl}/api/case-studies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudy(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch case study", error);
        setLoading(false);
      });
  }, [id]);

  // Extract headings from HTML content after the content is loaded
  useEffect(() => {
    if (study?.content && contentRef.current) {
      // Create a temporary div to parse the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = study.content;
      
      // Find all headings (h1, h2, h3, etc.) in the content
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      // Build TOC structure
      const toc = Array.from(headings).map((heading, index) => {
        // Create IDs for the headings if they don't exist
        const headingId = `heading-${index}`;
        if (!heading.id) {
          heading.id = headingId;
        }
        
        return {
          id: headingId,
          text: heading.textContent,
          level: parseInt(heading.tagName.substring(1)) // h1 -> 1, h2 -> 2, etc.
        };
      });
      
      setTableOfContents(toc);
      
      // Process the content - add IDs to headings, render LaTeX, add copy buttons
      processContent();
    }
  }, [study?.content]);
  
  // Process the content - add IDs to headings, render LaTeX, add copy buttons
  const processContent = useCallback(() => {
    if (!contentRef.current || !study?.content) return;
    
    // 1. Add IDs to headings for TOC links and set scroll margin
    const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    Array.from(headings).forEach((heading, index) => {
      const headingId = `heading-${index}`;
      heading.id = headingId; // This sets the ID in the actual rendered content
      heading.style.scrollMarginTop = '5rem';
    });
    
    // 2. Find and render LaTeX formulas with improved method
    const renderLatex = () => {
      // First handle elements with .math class
      const latexElements = contentRef.current.querySelectorAll('.math');
      latexElements.forEach(el => {
        try {
          katex.render(el.textContent.trim(), el, { 
            displayMode: el.classList.contains('display'),
            throwOnError: false
          });
        } catch (e) {
          console.error('Failed to render LaTeX in element:', e);
        }
      });
      
      // Now handle inline math with $$ delimiters
      const allElements = contentRef.current.querySelectorAll('p, li, div');
      allElements.forEach(element => {
        if (!element.childNodes || element.querySelector('.math')) return;
        
        // Text content that might contain LaTeX
        const textContent = element.innerHTML;
        
        // Check if there are any LaTeX delimiters
        if (!textContent.includes('$$')) return;
        
        // Process LaTeX - replace $$ formula $$ with rendered output
        let newContent = textContent;
        const regex = /\$\$(.*?)\$\$/gs;
        const matches = textContent.match(regex);
        
        if (matches) {
          matches.forEach(match => {
            const formula = match.slice(2, -2).trim();
            try {
              // Create a temporary element to hold rendered LaTeX
              const temp = document.createElement('div');
              katex.render(formula, temp, { displayMode: true });
              
              // Replace the original $$ formula $$ with rendered HTML
              newContent = newContent.replace(match, temp.innerHTML);
            } catch (e) {
              console.error('Failed to render LaTeX:', formula, e);
            }
          });
          
          // Replace element content with the processed content
          element.innerHTML = newContent;
        }
      });
    };
    
    // 3. Add copy buttons to code blocks with enhanced method for better visibility
    const addCopyButtons = () => {
      // Target both pre code and div.highlight (which is common in Jupyter notebooks)
      const codeBlocks = contentRef.current.querySelectorAll('pre code, div.highlight pre, .jp-CodeCell pre, .input_area pre');
      
      console.log('Found code blocks:', codeBlocks.length); // Debug info
      
      codeBlocks.forEach((codeBlock, index) => {
        // Get the parent container that should position the button
        let wrapper = codeBlock.closest('pre') || codeBlock;
        
        // Skip if button already exists
        if (wrapper.querySelector('.copy-code-button')) return;
        
        console.log('Adding button to code block', index); // Debug info
        
        // Make sure wrapper has correct positioning
        wrapper.style.position = 'relative';
        
        // Create the copy button with improved visibility
        const copyButton = document.createElement('button');
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        `;
        copyButton.className = 'copy-code-button';
        copyButton.title = 'Copy code';
        // Make the button visible by default
        copyButton.style.opacity = '1';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '5px';
        copyButton.style.right = '5px';
        copyButton.style.padding = '4px 8px';
        copyButton.style.backgroundColor = 'white';
        copyButton.style.border = '1px solid #e2e8f0';
        copyButton.style.borderRadius = '4px';
        copyButton.style.display = 'flex';
        copyButton.style.alignItems = 'center';
        copyButton.style.gap = '4px';
        copyButton.style.fontSize = '12px';
        copyButton.style.zIndex = '20';
        
        copyButton.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // Get the code text - handle different notebook formats
          const code = codeBlock.textContent || codeBlock.innerText;
          
          // Fallback method for copying text
          const copyFallback = () => {
            const textarea = document.createElement('textarea');
            textarea.value = code;
            textarea.style.position = 'fixed'; // Avoid scrolling to bottom
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
              document.execCommand('copy');
              copyButton.innerHTML = `<span>Copied!</span>`;
            } catch (err) {
              console.error('Fallback: Could not copy text: ', err);
              copyButton.innerHTML = `<span>Failed</span>`;
            }
            
            document.body.removeChild(textarea);
            setTimeout(() => {
              copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              `;
            }, 2000);
          };
          
          // Try to use the clipboard API with a fallback
          if (navigator.clipboard) {
            navigator.clipboard.writeText(code)
              .then(() => {
                copyButton.innerHTML = `<span>Copied!</span>`;
                setTimeout(() => {
                  copyButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copy</span>
                  `;
                }, 2000);
              })
              .catch(() => copyFallback());
          } else {
            copyFallback();
          }
        };
        
        wrapper.appendChild(copyButton);
      });
    };
    
    // 4. Make tables horizontally scrollable when they overflow
    const makeTablesScrollable = () => {
      const tables = contentRef.current.querySelectorAll('table');
      
      tables.forEach(table => {
        // Skip if already wrapped
        if (table.parentElement.classList.contains('table-wrapper')) return;
        
        // Create a wrapper div with horizontal scroll
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        wrapper.style.overflowX = 'auto';
        wrapper.style.width = '100%';
        wrapper.style.marginBottom = '1rem';
        wrapper.style.display = 'block';
        
        // Set table to full width of its content
        table.style.width = 'auto';
        table.style.maxWidth = 'none';
        table.style.tableLayout = 'auto';
        
        // Replace the table with the wrapper containing the table
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
    };
    
    // Run the content processing functions with increased timeout
    setTimeout(() => {
      renderLatex();
      addCopyButtons();
      makeTablesScrollable(); // Add the new table handling
      setupIntersectionObserver();
      
      // Add a second attempt for code blocks and tables that might be rendered later
      setTimeout(() => {
        addCopyButtons();
        makeTablesScrollable();
      }, 1000);
    }, 300);
  }, [study?.content]);
  
  // IMPROVED: Setup intersection observer and scroll handling for better TOC synchronization
  const setupIntersectionObserver = useCallback(() => {
    if (headingObserver.current) {
      headingObserver.current.disconnect();
    }
    
    // Remove any existing scroll listener
    if (scrollListenerRef.current) {
      window.removeEventListener('scroll', scrollListenerRef.current);
    }
    
    const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;
    
    // Set initial active heading
    if (headings[0] && !activeHeading) {
      setActiveHeading(headings[0].id);
    }
    
    // Create a headings map for lookup during scroll
    const headingsMap = Array.from(headings).map(heading => ({
      id: heading.id,
      offsetTop: heading.offsetTop,
      element: heading
    }));
    
    // More aggressive intersection observer settings
    const options = {
      root: null,
      rootMargin: '-40px 0px -70% 0px', // Detect headings sooner
      threshold: [0, 0.25, 0.5, 0.75, 1] // Multiple thresholds for better accuracy
    };
    
    // Observer callback with improved logic
    headingObserver.current = new IntersectionObserver((entries) => {
      // Get all currently visible headings
      const visibleHeadings = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => ({
          id: entry.target.id,
          y: entry.boundingClientRect.y,
          ratio: entry.intersectionRatio
        }))
        .sort((a, b) => b.ratio - a.ratio); // Sort by visibility ratio
    
      if (visibleHeadings.length > 0) {
        // Prioritize headings nearest to the top of viewport
        const topHeadings = visibleHeadings.sort((a, b) => a.y - b.y);
        if (topHeadings[0] && topHeadings[0].id !== activeHeading) {
          setActiveHeading(topHeadings[0].id);
        }
      }
    }, options);
    
    // Observe all headings
    headings.forEach(heading => {
      headingObserver.current.observe(heading);
    });
    
    // Add scroll event listener for more immediate feedback
    const handleScroll = () => {
      // Skip if we're not mounted or don't have headings
      if (!contentRef.current || headingsMap.length === 0) return;
      
      const scrollPosition = window.scrollY + 100; // Add offset for header
      
      // Find the current heading based on scroll position
      let currentHeadingIndex = -1;
      
      // Find the last heading that is above the current scroll position
      for (let i = headingsMap.length - 1; i >= 0; i--) {
        const offsetTop = getElementAbsoluteTop(headingsMap[i].element);
        if (offsetTop <= scrollPosition) {
          currentHeadingIndex = i;
          break;
        }
      }
      
      if (currentHeadingIndex !== -1 && 
          headingsMap[currentHeadingIndex].id !== activeHeading) {
        setActiveHeading(headingsMap[currentHeadingIndex].id);
      } else if (currentHeadingIndex === -1 && headingsMap[0]) {
        // If we're at the top, set the first heading as active
        setActiveHeading(headingsMap[0].id);
      }
    };
    
    // Helper to get absolute position considering all offsets
    function getElementAbsoluteTop(element) {
      let top = 0;
      let current = element;
      
      while (current) {
        top += current.offsetTop;
        current = current.offsetParent;
      }
      
      return top;
    }
    
    // Debounce the scroll handler for better performance
    const debouncedScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };
    
    // Store reference to remove later
    scrollListenerRef.current = debouncedScrollHandler;
    
    // Add the scroll listener
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    
    // Run once to set initial active heading
    setTimeout(handleScroll, 100);
    
    // Cleanup function
    return () => {
      if (headingObserver.current) {
        headingObserver.current.disconnect();
      }
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
    };
  }, [activeHeading]);
  
  // IMPROVED: Scroll to section function for better responsiveness
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Set active heading immediately for better user feedback
      setActiveHeading(id);
      
      // Calculate position accounting for fixed header
      const headerHeight = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      // Smooth scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Clean up observers on unmount
  useEffect(() => {
    return () => {
      if (headingObserver.current) {
        headingObserver.current.disconnect();
      }
      if (scrollListenerRef.current) {
        window.removeEventListener('scroll', scrollListenerRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold">Case study not found</h2>
        <Link 
          to="/"
          className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center mt-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        {/* Updated back button positioned to the left with project card style */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        {/* Centered title, description and tech stack */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">{study.title}</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">{study.description}</p>
          
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {study.techStack.split(",").map((tech, index) => (
              <span 
                key={index} 
                className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <aside className="w-full md:w-64 shrink-0">
              <div className="sticky top-20 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-[80vh] overflow-y-auto">
                <h3 className="text-lg font-bold mb-3 pb-2 border-b border-gray-200">
                  Table of Contents
                </h3>
                <nav className="toc">
                  <ul className="space-y-1">
                    {tableOfContents.map((item) => (
                      <li 
                        key={item.id}
                        className={`text-sm ${
                          item.level === 1 ? 'font-semibold' :
                          item.level === 2 ? 'ml-2' :
                          item.level === 3 ? 'ml-4' :
                          'ml-6'
                        }`}
                      >
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`hover:text-blue-500 text-left w-full truncate ${
                            activeHeading === item.id ? 'text-blue-500 font-bold' : 'text-gray-700'
                          }`}
                        >
                          {item.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
          
          {/* Main Content */}
          <div className={`flex-grow ${tableOfContents.length > 0 ? 'md:max-w-[calc(100%-18rem)]' : ''}`}>
            {study.content ? (
              <div 
                ref={contentRef}
                className="notebook-content prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: study.content }}
              />
            ) : (
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                <p className="text-yellow-700">
                  No notebook content has been uploaded for this case study yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};