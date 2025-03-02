const config = {
    apiUrl: process.env.NODE_ENV === 'production' 
      ? 'https://your-backend-url.com' // Change this after Render deployment
      : 'http://localhost:5000'
  };
  
  export default config;