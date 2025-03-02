# Portfolio Website Frontend [LINK](https://parth-soni.netlify.app/)

This repository contains the frontend code for Parth Soni's portfolio website. The site showcases data science projects, professional information, and interactive case studies with Jupyter notebook visualization support.

## 🔍 Project Overview

This React-based portfolio website features:
- Interactive data science case studies with notebook visualizations
- Professional information and project showcases
- Responsive design with Tailwind CSS
- Admin panel for content management

## 📁 File Structure & Description

### Core Files

- `src/App.jsx` - Main application component and routing configuration
- `src/main.jsx` - Entry point that renders the App component
- `src/config.js` - Configuration file with API endpoints
- `vite.config.js` - Vite configuration for building and development

### Components

- `src/components/CaseStudiesPage.jsx` - Displays all case studies with error handling and retry logic
- `src/components/CaseStudyDetail.jsx` - Renders individual case studies with Jupyter notebook visualizations
- `src/components/AdminUploadForm.jsx` - Admin interface for uploading and managing case studies
- `src/components/LoadingScreen.jsx` - Initial loading animation

### UI Components

- `src/components/Header.jsx` - Navigation and header component
- `src/components/Footer.jsx` - Site footer with contact information
- `src/components/sections/` - Contains section components for the homepage:
  - `Hero.jsx` - Hero section with introduction
  - `About.jsx` - About me section
  - `Skills.jsx` - Technical skills showcase
  - `Projects.jsx` - Featured projects display
  - `Contact.jsx` - Contact form

### Assets & Styles

- `src/assets/` - Images, icons, and other static assets
- `public/` - Public assets including notebook HTML files
- `tailwind.config.js` - Tailwind CSS configuration
- `index.html` - HTML template

## 🔧 Technologies Used

- React 18+
- Vite (build tool)
- React Router
- Tailwind CSS
- KaTeX (for LaTeX rendering)
- Prism.js (for code syntax highlighting)

## 🚀 Setup and Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/deploy-portfolio.git
    cd deploy-portfolio
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the project root with the following variables:

    ```
    VITE_API_URL=https://your-backend-url.onrender.com
    ```

## 💻 Development Workflow

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173`

3. Make changes to the code and see live updates thanks to Hot Module Replacement

## 🏗️ Building for Production

1. Build the project:

    ```bash
    npm run build
    ```

2. Preview the production build locally:

    ```bash
    npm run preview
    ```

## 📤 Deployment

The site is configured for deployment to Netlify:

1. Make sure your Netlify account is connected to your GitHub repository

2. Configure build settings in Netlify:
   - Build command: `npm run build`
   - Publish directory: [dist](http://_vscodecontentref_/1)

3. Deploy directly from the command line:

    ```bash
    npm install -g netlify-cli
    netlify deploy --prod
    ```

## 🔌 Backend Repository

The backend code for this portfolio is maintained in a separate repository:
[Portfolio Backend Repository](https://github.com/ParthSoni-CS/portfolio-backend)

## 📝 Additional Notes

- The website integrates with the backend for content management and case study retrieval
- Jupyter notebooks are converted to HTML on the backend and served as static content
- For admin access, navigate to `/admin/upload` and log in with your credentials

## 📧 Contact

For questions or feedback, please reach out to me at [parths@workwebmail.com](mailto:parths@workwebmail.com)
