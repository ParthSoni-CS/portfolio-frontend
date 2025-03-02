import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";

export const Contact = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="px-4 w-full max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>
  
          {/* Contact Info Card */}
          <div className="bg-white rounded-xl border border-gray-300 p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-8 text-center">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Name */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium text-lg">Parth Soni</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900 font-medium text-lg">parths@workwebmail.com</p>
                </div>
              </div>
              
              {/* Mobile */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="text-gray-900 font-medium text-lg">682-364-3662</p>
                </div>
              </div>
              
              {/* Interests */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interests</p>
                  <p className="text-gray-900 font-medium text-lg">Data Science, Machine Learning</p>
                </div>
              </div>
              
              {/* Age */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="text-gray-900 font-medium text-lg">24</p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center">
                <div className="p-3 bg-blue-500/10 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900 font-medium text-lg">Dallas, TX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};