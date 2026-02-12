# CitiLearn - Aviation Training Dashboard

CitiLearn is a premium, high-fidelity learning management system (LMS) developed specifically for **Citilink Indonesia**. This project was created primarily as part of a **UI/UX Design Internship** task at **Citilink** to demonstrate a modern, accessible, and high-end digital learning experience for aviation professionals (pilots, crew, and technical staff).

The platform focuses on operational efficiency, providing a sleek interface to monitor certification progress, mandatory updates, and critical aviation manuals with a premium Citilink brand aesthetic.

## ✨ Key Features

- **Personalized Learning Hub**: Dynamic hero section with real-time statistics (enrolled courses, completion rates, and learning hours).
- **Resume Training Intelligence**: Intelligently tracks progress and allows users to jump back into lessons via a signature carousel.
- **Visual Analytics**: Interactive donut charts (via Recharts) providing a clear breakdown of training distribution across categories (Aviation, Safety, Technical, etc.).
- **Smart Training Library**: Advanced course filtering by category and status, integrated with a custom-built premium pagination system.
- **Premium Design System**: Atomic design approach with reusable common components (Buttons, Cards, Badges, Progress Bars).
- **Dark Mode Optimized**: Native support for dark/light themes with a color palette tailored for aviation environments.
- **Fluid Micro-interactions**: Smooth transitions and animations powered by Framer Motion.

## 🛠️ Technical Excellence

- **Core**: Built with [React 19](https://react.dev/) and [Vite](https://vitejs.dev/) for ultra-fast performance.
- **Styling**: Leverages [Tailwind CSS v4](https://tailwindcss.com/) for a modern utility-first approach.
- **State & Logic**: Clean component architecture with centralized constants for UI tokens and course metadata.
- **Data Architecture**: Data-driven UI using a comprehensive `data.json` structure representing complex course modules and lessons.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/setiadyanwar/Citilearn.git
   cd Citilearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

## 📁 Folder Structure

```
src/
├── api/                          # API integration layer
│   ├── client.js                 # Axios configuration with interceptors
│   ├── endpoints.js              # API endpoint constants
│   └── services/                 # API service modules
│       ├── authService.js        # Authentication API calls
│       └── courseService.js      # Course API calls
│
├── assets/                       # Static assets
│   ├── images/
│   └── icons/
│
├── components/                   # Reusable components
│   ├── common/                   # Generic reusable components
│   ├── course/                   # Course-specific components
│   ├── dashboard/                # Dashboard-specific components
│   ├── learning/                 # Learning-specific components
│   ├── layout/                   # Layout components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   └── ui/                       # shadcn/ui components
│
├── config/                       # Configuration files
│   └── app.config.js             # App-wide configuration
│
├── constants/                    # Constants
│   ├── course.js
│   └── ui.js
│
├── contexts/                     # React Context providers
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.js                # Authentication hook
│   └── useDebounce.js            # Debounce hook
│
├── lib/                          # Third-party library configs
│   └── utils.js
│
├── pages/                        # Page components
│   ├── Dashboard.jsx             # Dashboard page
│   ├── ExploreCourses.jsx        # Explore courses page
│   ├── CourseDetail.jsx          # Course detail page
│   ├── CourseLearning.jsx        # Course learning page
│   └── Login.jsx                 # Login page
│
├── routes/                       # Route definitions
│
├── services/                     # Business logic services
│
├── utils/                        # Utility functions
│   ├── helpers.js                # Common helper functions
│   └── validators.js             # Validation functions
│
├── App.jsx                       # Main App component
└── main.jsx                      # Entry point
```

## 📄 License

This project is created for **UI/UX Internship Portfolio** purposes for **Citilink Indonesia**.
