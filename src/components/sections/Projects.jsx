import { RevealOnScroll } from "../RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FrameVision-SaaS */}
            <div className="p-6 rounded-xl border border-gray-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <h3 className="text-xl font-bold mb-2">FrameVision-SaaS</h3>
              <p className="text-gray-600 mb-4">
                A SaaS solution leveraging computer vision to analyze video frames in real time and provide automated diagnostics and analytics. It features a scalable backend and interactive dashboards for monitoring performance.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "Node.js", "Python", "TensorFlow", "OpenCV", "Express", "MongoDB"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/ParthSoni-CS/FrameVision-SaaS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            {/* Kafka Streaming Analysis */}
            <div
              className="
              glass p-6 rounded-xl border border-gray-300 
              hover:-translate-y-1 hover:border-blue-300
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">Kafka Streaming Analysis</h3>
              <p className="text-gray-600 mb-4">
                A high throughput streaming pipeline processing over 1.2 Billion data points per hour using Apache Kafka. The system aggregates streaming data in real time to enable rapid insights and anomaly detection.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Apache Kafka", "Spark", "Scala", "Hadoop", "Kafka Streams", "Zookeeper"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/ParthSoni-CS/Kafka-streaming-analysis-1.2Billion-datapoints-perhour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            {/* Smart City Car Data Streaming */}
            <div
              className="
              glass p-6 rounded-xl border border-gray-300 
              hover:-translate-y-1 hover:border-blue-300
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">Smart City Car Data Streaming</h3>
              <p className="text-gray-600 mb-4">
                A real-time streaming platform optimized for processing smart city car sensor telemetry to improve urban mobility. It enables predictive maintenance and enhanced traffic management.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Apache Kafka", "Flink", "Python", "Docker", "Kubernetes", "Airflow"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/ParthSoni-CS/smart_city_car_data_streaming_processing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            {/* E-commerce Realtime Data Streaming */}
            <div
              className="
              glass p-6 rounded-xl border border-gray-300 
              hover:-translate-y-1 hover:border-blue-300
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">E-commerce Realtime Data Streaming</h3>
              <p className="text-gray-600 mb-4">
                An end-to-end real-time streaming data processing system designed specifically for e-commerce platforms. It supports dynamic scaling and real-time filtering to deliver timely analytics.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Apache Kafka", "Node.js", "AWS", "ElasticSearch", "Redis"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/ParthSoni-CS/ecommerce-realtime-datastreaming-processing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            {/* Price Prediction End-to-End */}
            <div
              className="
              glass p-6 rounded-xl border border-gray-300 
              hover:-translate-y-1 hover:border-blue-300
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">Price Prediction End-to-End</h3>
              <p className="text-gray-600 mb-4">
                A complete machine learning pipeline for price prediction encompassing data processing, model training, and deployment. The solution integrates robust validation and real-time inferencing.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Python", "scikit-learn", "TensorFlow", "Docker", "Pandas", "NumPy"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/ParthSoni-CS/price-prediction-end-to-end"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            {/* Statistics Codes */}
            <div
              className="
              glass p-6 rounded-xl border border-gray-300 
              hover:-translate-y-1 hover:border-blue-300
              hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]
              transition-all
            "
            >
              <h3 className="text-xl font-bold mb-2">Statistics Codes</h3>
              <p className="text-gray-600 mb-4">
                A repository of statistical analysis scripts and visualizations applied to diverse datasets. It serves as a toolkit for both academic research and practical business analytics.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["R", "Python", "ggplot2", "Pandas", "Matplotlib", "Seaborn"].map((tech, key) => (
                  <span
                    key={key}
                    className="
                      bg-blue-500/10 text-blue-500 py-1 px-3 
                      rounded-full text-sm
                      transition
                      hover:bg-blue-500/20 hover:-translate-y-0.5
                      hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/ParthSoni-CS/Statistics-Codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};