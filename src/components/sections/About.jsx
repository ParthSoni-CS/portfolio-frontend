import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  const aiSkills = [
    "TensorFlow", 
    "PyTorch",
    "Langchain",
    "LangGraph",
    "LlamaIndex",
    "Huggingface",
    "scikit-learn",
    "Pandas",
    "NumPy",
  ];

  const databaseSkills = [
    "MySQL",
    "MongoDB",
    "PostgreSQL",
    "NoSQL",
    "Amazon Redshift",
    "MS SQL Server",
    "Snowflake",
  ];

  const dataEngineeringSkills = [
    "Apache Spark",
    "Flink",
    "Hadoop",
    "Kafka",
    "Airflow",
    "Apache NiFi",
    "Google BigQuery",
    "AWS Glue",
  ];

  const cloudToolsSkills = [
    "AWS",
    "Google Cloud",
    "Power BI",
    "Tableau",
    "JIRA",
    "Jenkins",
    "Docker",
    "Kubernetes",
  ];

  const languageSkills = [
    "Python",
    "R Studio",
    "SQL",
    "Java",
    "C",
    "C++",
  ];

  const certifications = [
    { title: "AWS Certified Data Engineer", provider: "Associate", year: "2025" },
    { title: "AWS Certified Developer", provider: "Associate", year: "2025" },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          <div className="rounded-xl p-8 border border-gray-300 hover:-translate-y-1 transition-all">
            <p className="text-gray-900 mb-6">
              Strategic Data Scientist with 3+ years of experience in ML, NLP, and Generative AI, optimizing data pipelines with big data frameworks and multi-cloud (AWS/GCP). Skilled in Python, SQL, Docker, Kubernetes, and microservices, with certifications in AWS Data Engineer Associate & AWS Developer Associate.
            </p>

            {/* Top Grid: Cloud & Tools and Artificial Intelligence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Cloud & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {cloudToolsSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Artificial Intelligence</h3>
                <div className="flex flex-wrap gap-2">
                  {aiSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Grid remains unchanged */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Database</h3>
                <div className="flex flex-wrap gap-2">
                  {databaseSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Data Engineering Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {dataEngineeringSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* New Languages Section (swapped from top) */}
            <div className="mt-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languageSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Education Section */}
            <div className="p-6 rounded-xl border border-gray-300 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">🏫 Education</h3>
              <ul className="list-disc list-insidetext-gray-600 space-y-2">
                <li>
                  <strong>M.S. in Computer Science</strong> - University of Texas at Arlington (2022 - 2024)
                </li>
                <li>
                  <strong>B.Tech in Computer Science</strong> - Gujarat Technological University (2018 - 2022)
                </li>
              </ul>
            </div>

            {/* Work Experience Section */}
            <div className="p-6 rounded-xl border border-gray-300 hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4">💼 Work Experience</h3>
              <div className="space-y-4text-gray-600">
                <div>
                  <h4 className="font-semibold">
                    Data Science at Target Corporation (2024 - Present)
                  </h4>
                </div>
                <div>
                  <h4 className="font-semibold">
                    Data Science at Accenture (2021 - 2022)
                  </h4>
                </div>
                <div>
                  <h4 className="font-semibold">
                    Data Science at TCS (2020 - 2021)
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="p-6 rounded-xl border border-gray-300 hover:-translate-y-1 transition-all mt-8">
            <h3 className="text-xl font-bold mb-4">🎖 Certifications</h3>
            <ul className="list-disc list-insidetext-gray-600 space-y-2">
              {certifications.map((cert, key) => (
                <li key={key}>
                  <strong>{cert.title}</strong> - {cert.provider} ({cert.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};