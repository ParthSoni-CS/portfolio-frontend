import { useState, useEffect } from "react";
import config from '../config';

export const AdminUploadForm = () => {
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpRequestId, setOtpRequestId] = useState('');
  
  // Rest of the states
  const [mode, setMode] = useState("list");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [caseStudies, setCaseStudies] = useState([]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState("");
  const [selectedStudyData, setSelectedStudyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
  });

  // Auth refresh interval
  useEffect(() => {
    if (isAuthenticated) {
      const refreshInterval = setInterval(() => {
        checkAuthStatus();
      }, 5 * 60 * 1000);
      
      return () => clearInterval(refreshInterval);
    }
  }, [isAuthenticated]);
  
  // Check for saved OTP state and auth status on load
  useEffect(() => {
    // Check if we have saved OTP data - use localStorage for better persistence
    const storedRequestId = localStorage.getItem('otpRequestId');
    const storedShowOtpInput = localStorage.getItem('showOtpInput') === 'true';
    
    console.log("Initial load - checking saved state:", { storedRequestId, storedShowOtpInput });
    
    if (storedRequestId && storedShowOtpInput) {
      setOtpRequestId(storedRequestId);
      setShowOtpInput(true);
    }
    
    checkAuthStatus();
  }, []);
  
  // Check if the user is already authenticated
  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/check-auth`, {
        method: "GET",
        credentials: "include", // Important for cookies
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        // Clear any OTP state if we're already authenticated
        localStorage.removeItem('otpRequestId');
        localStorage.removeItem('showOtpInput');
        fetchCaseStudies();
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
    }
  };
  
  // Handle login form input changes
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle login - Step 1: Verify credentials and request OTP - SIMPLIFIED VERSION
  const handleLogin = () => {
    console.log("Login attempt starting with:", loginData.username);
    setIsLoading(true);
    setLoginError("");
    
    // Send the login request
    fetch(`${config.apiUrl}/api/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      credentials: "include"
    })
    .then(response => {
      console.log("OTP request status:", response.status);
      
      if (response.ok) {
        return response.json().then(result => {
          console.log("OTP request successful");
          
          // Use localStorage instead of sessionStorage for better persistence
          localStorage.setItem('otpRequestId', result.requestId);
          localStorage.setItem('showOtpInput', 'true');
          
          // Update state to show OTP input
          setOtpRequestId(result.requestId);
          setShowOtpInput(true);
          setMessage("OTP has been sent to your email. Please check and enter it below.");
        });
      } else {
        return response.json().then(error => {
          console.error("Login failed:", error);
          setLoginError(error.error || "Login failed");
        });
      }
    })
    .catch(error => {
      console.error("Login network error:", error);
      setLoginError(`Network error: ${error.message}. Please try again.`);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };
  
  // Handle OTP verification - Step 2: Submit OTP to complete login - SIMPLIFIED
  const handleVerifyOtp = () => {
    setIsLoading(true);
    setOtpError("");
    
    fetch(`${config.apiUrl}/api/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        requestId: otpRequestId,
        otp
      }),
    })
    .then(response => {
      if (response.ok) {
        // OTP verified, user is now logged in
        return response.json().then(result => {
    localStorage.setItem('adminToken', result.token);
    setIsAuthenticated(true);
    setOtp("");
    setShowOtpInput(false);
    fetchCaseStudies();
  });
        
        // Clear localStorage
        localStorage.removeItem('otpRequestId');
        localStorage.removeItem('showOtpInput');
        
        fetchCaseStudies();
      } else {
        return response.json().then(error => {
          setOtpError(error.error || "OTP verification failed");
        });
      }
    })
    .catch(error => {
      console.error("OTP verification network error:", error);
      setOtpError("Network error. Please try again.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch(`${config.apiUrl}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      
      // Clear any stored state
      localStorage.removeItem('otpRequestId');
      localStorage.removeItem('showOtpInput');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Fetch all case studies when authenticated
  const fetchCaseStudies = async () => {
    try {
      // Get token from localStorage if it exists
      const token = localStorage.getItem('adminToken');
      const headers = token ? { "Authorization": `Bearer ${token}` } : {};
      
      const res = await fetch(`${config.apiUrl}/api/case-studies`, {
        headers: headers,
        credentials: "include" // Still include cookies too
      });
      
      const data = await res.json();
      setCaseStudies(data);
    } catch (error) {
      console.error("Failed to fetch case studies", error);
      setMessage("Error loading case studies. Please try again.");
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Switch to edit mode for a specific case study
  const handleEditStudy = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${config.apiUrl}/api/case-studies/${id}`);
      const data = await res.json();
      
      setSelectedStudyData(data);
      setFormData({
        title: data.title,
        description: data.description,
        techStack: data.techStack,
      });
      setMode("edit");
    } catch (error) {
      console.error("Failed to fetch case study details", error);
      setMessage("Error loading case study details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notebook upload with credentials
  const handleNotebookUpload = async (e) => {
    e.preventDefault();
    
    if (!file || !selectedCaseStudy) {
      setMessage("Please select both a file and a case study");
      return;
    }
    
    if (!file.name.endsWith('.ipynb')) {
      setMessage("Please select a Jupyter Notebook (.ipynb) file");
      return;
    }
    
    setIsLoading(true);
    setMessage("Uploading and processing notebook...");

    const formData = new FormData();
    formData.append("file", file);
    
    // Add token if available
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${config.apiUrl}/api/case-studies/${selectedCaseStudy}/upload`, {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        body: formData,
        credentials: "include"
      });
      
      if (response.ok) {
        const result = await response.json();
        setMessage("Notebook successfully uploaded and associated with case study!");
        setFile(null);
        setSelectedCaseStudy("");
      } else {
        if (response.status === 401 || response.status === 403) {
          setIsAuthenticated(false);
          setMessage("Your session has expired. Please log in again.");
        } else {
          try {
            const error = await response.json();
            setMessage(`Error: ${error.error || 'Unknown error uploading notebook'}`);
          } catch (e) {
            setMessage(`Error: Server returned status ${response.status}`);
          }
        }
      }
    } catch (error) {
      setMessage(`Error uploading file: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new case study with authentication
  // In AdminUploadForm.jsx - modify handleCreateSubmit
  
  const handleCreateSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setMessage("");
  
    try {
      // Retrieve token from localStorage if available
      const token = localStorage.getItem('adminToken');
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      };
  
      const response = await fetch(`${config.apiUrl}/api/case-studies`, {
        method: "POST",
        headers,
        credentials: "include", // Include cookies as backup
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setMessage("Case study created successfully!");
        setFormData({ title: "", description: "", techStack: "" });
        fetchCaseStudies();
        setMode("list");
      } else if (response.status === 401 || response.status === 403) {
        setIsAuthenticated(false);
        setMessage("Your session has expired. Please log in again.");
      } else {
        const errorText = await response.text();
        try {
          const error = JSON.parse(errorText);
          setMessage(`Error: ${error.error || 'Unknown error creating case study'}`);
        } catch (e) {
          setMessage(`Error: Server returned status ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Client error:", error);
      setMessage(`Error creating case study: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Update case study with authentication
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${config.apiUrl}/api/case-studies/${selectedStudyData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setMessage("Case study updated successfully!");
        fetchCaseStudies();
        setMode("list");
      } else {
        if (response.status === 401 || response.status === 403) {
          setIsAuthenticated(false);
          setMessage("Your session has expired. Please log in again.");
        } else {
          try {
            const errorData = await response.json();
            setMessage(`Error: ${errorData.error || 'Unknown server error'}`);
          } catch (jsonError) {
            const text = await response.text();
            setMessage(`Error ${response.status}: Server returned invalid response`);
            console.error("Server response:", text.substring(0, 300));
          }
        }
      }
    } catch (error) {
      console.error("Client error:", error);
      setMessage(`Error updating case study: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete with authentication
  const handleDeleteStudy = async (id) => {
    if (!window.confirm("Are you sure you want to delete this case study? This action cannot be undone.")) {
      return;
    }
    
    setIsLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${config.apiUrl}/api/case-studies/${id}`, {
        method: "DELETE",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        credentials: "include"
      });
      
      if (response.ok) {
        setMessage("Case study deleted successfully");
        fetchCaseStudies();
      } else {
        if (response.status === 401 || response.status === 403) {
          setIsAuthenticated(false);
          setMessage("Your session has expired. Please log in again.");
        } else {
          try {
            const error = await response.json();
            setMessage(`Error: ${error.error || 'Unknown error deleting case study'}`);
          } catch (e) {
            setMessage(`Error: Server returned status ${response.status}`);
          }
        }
      }
    } catch (error) {
      console.error("Client error:", error);
      setMessage(`Error deleting case study: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Render the login form - SIMPLIFIED HTML STRUCTURE
  const renderLoginForm = () => (
    <div className="max-w-md mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Login</h2>
      
      {loginError && (
        <div className="mb-6 p-4 rounded bg-red-100 text-red-700">
          {loginError}
        </div>
      )}
      
      {!showOtpInput ? (
        // Username/Password form - simplified to div instead of form
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleLoginInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Sending OTP..." : "Request OTP"}
            </button>
          </div>
        </div>
      ) : (
        // OTP input form - simplified to div
        <div className="bg-white shadow-md rounded-lg p-8">
          {otpError && (
            <div className="mb-6 p-4 rounded bg-red-100 text-red-700">
              {otpError}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              Enter OTP sent to your email
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowOtpInput(false);
                localStorage.removeItem('showOtpInput');
              }}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Back
            </button>
            
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Render the case studies list
  const renderCaseStudiesList = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Case Studies</h2>
        <button 
          onClick={handleLogout}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
      
      <button
        onClick={() => {
          setFormData({ title: "", description: "", techStack: "" });
          setMode("create");
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6 hover:bg-green-600 transition"
      >
        Create New Case Study
      </button>
      
      {caseStudies.length === 0 ? (
        <p className="text-gray-500 italic">No case studies found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {caseStudies.map((study) => (
            <div 
              key={study.id} 
              className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold">{study.title}</h3>
              <p className="text-gray-600 my-2">{study.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {study.techStack.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/10 text-blue-500 py-1 px-2 rounded-full text-xs"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEditStudy(study.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedCaseStudy(study.id);
                    setMode("upload");
                  }}
                  className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition"
                >
                  Upload Notebook
                </button>
                <button
                  onClick={() => handleDeleteStudy(study.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Render the create case study form
  const renderCreateForm = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create New Case Study</h2>
        <button
          onClick={() => setMode("list")}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          &larr; Back to List
        </button>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); handleCreateSubmit(); }} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">
            Tech Stack (comma-separated):
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            placeholder="Python, TensorFlow, Pandas"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-green-500 text-white py-2 px-6 rounded font-medium transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          {isLoading ? "Creating..." : "Create Case Study"}
        </button>
      </form>
    </div>
  );

  // Render the edit case study form
  const renderEditForm = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edit Case Study</h2>
        <button
          onClick={() => setMode("list")}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          &larr; Back to List
        </button>
      </div>
      
      <form onSubmit={handleUpdateSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">
            Tech Stack (comma-separated):
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 text-white py-2 px-6 rounded font-medium transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Updating..." : "Update Case Study"}
        </button>
      </form>
    </div>
  );

  // Render the notebook upload form
  const renderUploadForm = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upload Notebook</h2>
        <button
          onClick={() => setMode("list")}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          &larr; Back to List
        </button>
      </div>
      
      <form onSubmit={handleNotebookUpload} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Selected Case Study:</label>
          <select
            value={selectedCaseStudy}
            onChange={(e) => setSelectedCaseStudy(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={isLoading}
            required
          >
            <option value="">-- Select a Case Study --</option>
            {caseStudies.map((study) => (
              <option key={study.id} value={study.id}>
                {study.title}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Upload Jupyter Notebook:</label>
          <input
            type="file"
            accept=".ipynb"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={isLoading}
            required
          />
        </div>
        
        <button
          type="submit"
          className={`bg-purple-500 text-white py-2 px-6 rounded font-medium transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Upload Notebook"}
        </button>
      </form>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      
      {/* Status message display */}
      {message && (
        <div 
          className={`mb-6 p-4 rounded ${
            message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
      
      {/* Show login form or admin interface based on authentication status */}
      {!isAuthenticated ? (
        renderLoginForm()
      ) : (
        <>
          {/* Render the appropriate UI based on current mode */}
          {mode === "list" && renderCaseStudiesList()}
          {mode === "create" && renderCreateForm()}
          {mode === "edit" && renderEditForm()}
          {mode === "upload" && renderUploadForm()}
        </>
      )}
    </div>
  );
};