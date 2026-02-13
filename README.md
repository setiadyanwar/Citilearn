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

### 🛡️ Admin & Instructor Studio
- **Course Management System**: Full granular control to create and edit Courses.
- **Module & Lesson Editor**: Drag-and-drop capability (planned) and intuitive forms for structuring learning paths.
- **Assessment Manager**: Robust tools to create quizzes (`QuestionEditor`), manage question banks, and assign tests to modules.
- **User Assignment**: Tools to assign courses to specific user groups or individuals.

## 🛠️ Technical Excellence

- **Core**: Built with [React 19](https://react.dev/) and [Vite](https://vitejs.dev/) for ultra-fast performance.
- **Styling**: Leverages [Tailwind CSS v4](https://tailwindcss.com/) for a modern utility-first approach.
- **UI Architecture**: Implements **shadcn/ui** patterns using [Radix UI](https://www.radix-ui.com/) primitives and `class-variance-authority` for accessible, robust components.
- **Motion**: Fluid micro-interactions and page transitions powered by [Framer Motion](https://www.framer.com/motion/).
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
├── admin/                        # Admin specific components (if any distinctive)
├── api/                          # API integration layer
│   ├── client.js                 # Axios configuration
│   └── services/                 # Service modules
├── assets/                       # Static assets (images, icons, logos)
├── components/                   # Component Library
│   ├── admin/                    # Admin-specific UI blocks
│   ├── common/                   # Shared atoms (Badge, Button, Card)
│   ├── course/                   # Course display components
│   ├── dashboard/                # Dashboard widgets & charts
│   ├── layout/                   # Layout shells (Sidebar, AdminLayout)
│   ├── learning/                 # Lesson player & quiz interfaces
│   └── ui/                       # shadcn/ui primitives (Tooltip, Label, etc.)
├── config/                       # Application configuration
├── constants/                    # Static data & UI tokens
├── contexts/                     # Global state providers
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities (cn, tw-merge)
├── pages/                        # Route Pages
│   ├── admin/                    # Admin Pages (CourseEditor, AssessmentManager)
│   ├── CourseDetail.jsx          # Course overview
│   ├── CourseLearning.jsx        # Learning player wrapper
│   ├── Dashboard.jsx             # Main learner dashboard
│   ├── ExploreCourses.jsx        # Course catalog
│   ├── FocusTest.jsx             # Examination mode
│   └── Login.jsx                 # Auth entry
├── routes/                       # Routing configuration
└── utils/                        # Helpers & formatters
```

## 📄 License

This project is created for **UI/UX Internship Portfolio** purposes for **Citilink Indonesia**.
