# CitiLearn - Aviation Training Dashboard

CitiLearn is a premium, high-fidelity learning management system (LMS) developed specifically for **Citilink Indonesia**. This project was created primarily as part of a **UI/UX Design Internship** task at **Citilink** to demonstrate a modern, accessible, and high-end digital learning experience for aviation professionals (pilots, crew, and technical staff).

The platform focuses on operational efficiency, providing a sleek interface to monitor certification progress, mandatory updates, and critical aviation manuals with a premium Citilink brand aesthetic.

## ✨ Key Features

### 🎓 Learner Experience
- **Personalized Learning Hub**: Dynamic hero section with real-time statistics (enrolled courses, completion rates, and learning hours).
- **Resume Training Intelligence**: Intelligently tracks progress and allows users to jump back into lessons via a signature carousel.
- **Smart Training Library**: Advanced course filtering by category and status, integrated with a custom-built premium pagination system.
- **Focus Mode & Assessments**: Dedicated examination interface (`FocusTest`) with distraction-free layout, timers, and progress tracking.
- **Video Picture-in-Picture (PiP)**: Continue watching training videos while navigating other sections of the dashboard.
- **Visual Analytics**: Interactive donut charts (via Recharts) providing a clear breakdown of training distribution across categories (Aviation, Safety, Technical, etc.).

### 🏢 Digital Workplace (New)
- **Culture Hub**: Dedicated sections for 'Agent of Culture', 'Activation', and 'Awards' to foster company values.
- **Collaboration Space**: 'Supergreeners Talk' and 'Story' pages for internal communication and engagement.

### 🛡️ Admin & Instructor Studio (Refactored)
- **Modular Studio Architecture**: Fully refactored into a feature-based structure with isolated components for `grading`, `assessment`, and `course` management.
- **Grading & Review Center**: Advanced interface for instructors to review student attempts with detailed answer breakdowns and performance badges.
- **Live Preview Course Editor**: Real-time "Student View" preview while building courses, featuring a dynamic Category Picker and Learning Objectives manager.
- **Standardized Search Logic**: Global integration of `MainSearchBar` across management tables with support for custom placeholders and togglable action buttons.
- **Assessment Engine**: Robust tools to configure passing grades, time limits, and question shuffle logic, now simplified through modular sub-components.

## 🛠️ Technical Excellence

- **Core**: Built with [React 19](https://react.dev/) and [Vite](https://vitejs.dev/) for ultra-fast performance.
- **Styling**: Powered by [Tailwind CSS v4](https://tailwindcss.com/) with a custom **Flat Design System** (no shadows, consistent borders, scale-based typography).
- **Architecture**: **Feature-Driven Development (FDD)** organization, grouping logic and components by domain (Admin, Learning, Dashboard, etc.).
- **UI Architecture**: Implements **shadcn/ui** patterns using [Radix UI](https://www.radix-ui.com/) primitives.
- **Motion**: Fluid micro-interactions and page transitions powered by [Framer Motion](https://www.framer.com/motion/).
- **Data Architecture**: Data-driven UI using a comprehensive `data.json` structure representing complex course modules and lessons.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

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

## 📁 Folder Structure (Current State)

```
src/
├── api/                          # Global API & Service layer
├── assets/                       # Branding, vectors, and static images
├── components/                   
│   ├── common/                   # Shared UI atoms (Pagination, Tabs, ImageUploader)
│   ├── layout/                   # Global shells (Sidebar, AdminHeader)
│   └── ui/                       # shadcn/ui primitives (Radix-based)
├── config/                       # App-wide configuration (env, providers)
├── constants/                    # UI Tokens, Color Palettes, and Constants
├── contexts/                     # React Contexts for global state (Auth, Theme)
├── features/                     # Feature-Driven Modules (Logic + Components)
│   ├── admin/                    # Studio routes & components (Grading, Course, Assessment)
│   ├── auth/                     # Authentication logic & forms
│   ├── courses/                  # Course catalog & grid system
│   ├── dashboard/                # Learner widgets, cards & charts
│   ├── learning/                 # Lesson player & focus test mode
│   └── profile/                  # User profile & performance stats
├── hooks/                        # Custom React hooks (useAuth, useProfile, etc.)
├── layouts/                      # Page-level wrapper components
├── lib/                          # Third-party library configs & utils (cn)
├── routes/                       # App-wide React Router configuration
├── utils/                        # Shared pure helpers & formatters
├── data.json                     # Main mock data source for the LMS
└── main.jsx                      # Application entry point
```

## 📄 License

This project is created for **Citilink Indonesia** purposes.
