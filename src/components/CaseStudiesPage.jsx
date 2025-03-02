// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export const CaseStudiesPage = () => {
//   const [studies, setStudies] = useState([]);

//   useEffect(() => {
//     fetch("/api/case-studies")
//       .then((res) => res.json())
//       .then((data) => setStudies(data))
//       .catch((error) => console.error("Failed to fetch case studies", error));
//   }, []);

//   return (
//     <section id="case-studies" className="min-h-screen py-20 bg-white text-gray-900">
//       <div className="max-w-5xl mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
//           Data Science Case Studies
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//           {studies.map((study) => (
//             <div key={study.id} className="p-6 rounded-xl border border-gray-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg transition">
//               <h3 className="text-xl font-bold mb-2">{study.title}</h3>
//               <p className="text-gray-600 mb-4">{study.description}</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {study.techStack.split(",").map((tech, index) => (
//                   <span
//                     key={index}
//                     className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//               <div className="flex justify-between items-center">
//                 <Link
//                   to={`/case-studies/${study.id}`}
//                   className="text-blue-400 hover:text-blue-300 transition-colors my-4"
//                 >
//                   View Case Study →
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from '../config';

export const CaseStudiesPage = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`${config.apiUrl}/api/case-studies`);      
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      
      const data = await res.json();
      setStudies(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch case studies", error);
      setError(error.message);
      setLoading(false);
      
      // Auto-retry after delay, up to 3 times
      if (retryCount < 3) {
        console.log(`Retrying fetch (${retryCount + 1}/3) in 1.5 seconds...`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 1500);
      }
    }
  };

  // Fetch on initial load and when retryCount changes
  useEffect(() => {
    fetchCaseStudies();
  }, [retryCount]);

  return (
    <section id="case-studies" className="min-h-screen py-20 bg-white text-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
          Data Science Case Studies
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="bg-red-50 border border-red-100 rounded-lg p-6 inline-block mx-auto">
              <p className="text-red-700 mb-4">
                {error}
              </p>
              <button 
                onClick={() => {
                  setRetryCount(prev => prev + 1);
                }}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors"
              >
                Retry Loading
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {studies.map((study) => (
              <div key={study.id} className="p-6 rounded-xl border border-gray-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.techStack.split(",").map((tech, index) => (
                    <span
                      key={index}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/case-studies/${study.id}`}
                    className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};