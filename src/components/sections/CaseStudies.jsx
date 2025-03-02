import { RevealOnScroll } from "../RevealOnScroll";
import { Link } from "react-router-dom";

export const CaseStudies = () => {
  // Dummy data for case studies
  const dummyCaseStudies = [
    {
      title: "Customer Churn Analysis",
      description:
        "Analyzed customer behavior and built predictive models to identify churn risk.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      link: "#", // Update with actual link if available
    },
    {
      title: "Sales Forecasting",
      description:
        "Developed time series models to forecast future sales for a retail chain.",
      technologies: ["R", "Prophet", "ggplot2"],
      link: "#",
    },
    {
      title: "Social Media Sentiment",
      description:
        "Leveraged NLP techniques to assess sentiment and trends across social media platforms.",
      technologies: ["Python", "NLTK", "TensorFlow", "Plotly"],
      link: "#",
    },
    {
      title: "Fraud Detection System",
      description:
        "Designed and implemented a system for detecting fraudulent transactions using machine learning.",
      technologies: ["Python", "Scikit-learn", "SQL", "Seaborn"],
      link: "#",
    },
  ];

  return (
    <section
      id="case-studies"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Data Science Case Studies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {dummyCaseStudies.map((study, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
              >
                <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.technologies.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={study.link}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};