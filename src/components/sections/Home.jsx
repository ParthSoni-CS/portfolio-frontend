import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-right">
            Hi, I'm Parth Soni
          </h1>
          <p className="tex-gray-400 text-lg mb-8 max-w-lg mx-auto">
            I’m a Data Scientist and Machine Learning Engineer. I love to work
            with data and build models that can help businesses make better
            decisions.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#projects"
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10"
            >
              Contact Me
            </a>
          </div>
          {/* New Buttons: GitHub and Resume with identical styling */}
          <div className="flex justify-center space-x-4 mt-8">
            <a
              href="https://github.com/ParthSoni-CS"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 border border-gray-300 py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(107,114,128,0.4)] flex items-center"
            >
              {/* GitHub Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 inline-block mr-2"
                fill="currentColor"
                viewBox="0 0 496 512"
              >
                <path d="M165.9 397.4c0 2-2.3 3.6-4.2 3.6-1.9 0-4.3-1.6-4.3-3.6 0-2 2.3-3.6 4.2-3.6 2 0 4.3 1.6 4.3 3.6zm-32.3-1.1c-.7 1.5-2.8 2-4.6.9-1.9-1.3-2.4-3.3-1.8-4.9.7-1.6 2.8-2 4.6-.9 1.9 1.1 2.4 3.4 1.8 4.9zm44.8 4.2c-1.1 1.5-3.8.8-5.9-1.4-2.1-2.2-2.5-4.9-1.4-6.4 1.1-1.5 3.8-.8 5.9 1.4 2.1 2.3 2.5 4.9 1.4 6.4zm32.8-9.4c-.5 1.7-3.1 2.7-5.7 1.7-2.6-1-3.7-3.1-3.2-4.8.5-1.7 3.1-2.7 5.7-1.7 2.6 1 3.7 3.1 3.2 4.8zM248 8C111 8 0 119 0 256c0 109.5 70.9 202.2 169.3 234.9 12.4 2.3 16.9-5.4 16.9-12 0-6 0-22-0-43.2-68.7 15-83.3-33-83.3-33-11.3-28.8-27.6-36.5-27.6-36.5-22.6-15.4 1.7-15.1 1.7-15.1 25 1.8 38.1 25.7 38.1 25.7 22.2 38 58.1 27 72.2 20.6 2.3-16 8.7-27 15.8-33.3-54.8-6.3-112.4-27.4-112.4-121.7 0-26.9 9.7-49 25.7-66.3-2.6-6.3-11.1-31.7 2.4-66.1 0 0 21-6.7 68.8 25.3 20-5.6 41.4-8.4 62.8-8.5 21.4.1 42.8 2.9 62.8 8.5 47.8-32 68.8-25.3 68.8-25.3 13.5 34.4 5 59.8 2.4 66.1 16 17.3 25.7 39.5 25.7 66.3 0 94.7-57.8 115.3-112.8 121.5 8.9 7.7 16.8 22.9 16.8 46.2 0 33.3 0 60.3 0 68.6 0 6.7 4.4 14.5 17 12C425.1 458.2 496 365.5 496 256 496 119 385 8 248 8z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://drive.google.com/file/d/1Q-_L9biWsqjURQ1uGe65v_DSEZ7Lc3G8/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 border border-gray-300 py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(107,114,128,0.4)] flex items-center"
            >
              {/* Resume Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 inline-block mr-2"
                fill="currentColor"
                viewBox="0 0 384 512"
              >
                <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.3 0-24-10.7-24-24zm121.9 101.9l-98.3 98.3c-4.7 4.7-12.3 4.7-17 0l-98.3-98.3C139.1 224 144 213.6 144 202.9V40h96v147c0 10.7 4.9 21.1 13.9 29.1l73.9 73.9c4.7 4.7 4.7 12.3 0 17z" />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};