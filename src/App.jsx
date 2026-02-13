import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ExploreCourses from './pages/ExploreCourses';
import CourseDetail from './pages/CourseDetail';
import CourseLearning from './pages/CourseLearning';
import LoginPage from './pages/Login';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManagement from './pages/admin/CourseManagement';
import CourseEditor from './pages/admin/CourseEditor';
import ModuleEditor from './pages/admin/ModuleEditor';
import LessonEditor from './pages/admin/LessonEditor';
import AssessmentManager from './pages/admin/AssessmentManager';
import QuestionEditor from './pages/admin/QuestionEditor';
import UserAssignment from './pages/admin/UserAssignment';
import FocusTest from './pages/FocusTest';


function App() {
  const [pipVideo, setPipVideo] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedStatus, setSelectedStatus] = React.useState('All');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/exam/:courseId/:lessonId" element={<FocusTest />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/courses/create" element={<CourseEditor />} />
              <Route path="/course/:id/edit" element={<CourseEditor />} />
              <Route path="/course/:courseId/module/new" element={<ModuleEditor />} />
              <Route path="/course/:courseId/module/:moduleId" element={<ModuleEditor />} />
              <Route path="/course/:courseId/module/:moduleId/lesson/new" element={<LessonEditor />} />
              <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" element={<LessonEditor />} />
              <Route path="/course/:courseId/assessment/:assessmentType" element={<AssessmentManager />} />
              <Route path="/course/:courseId/assessment/:assessmentType/question/new" element={<QuestionEditor />} />
              <Route path="/course/:courseId/assessment/:assessmentType/question/:questionId" element={<QuestionEditor />} />
              <Route path="/course/:courseId/assign" element={<UserAssignment />} />
              <Route path="*" element={<AdminDashboard />} /> {/* Fallback to dashboard */}
            </Routes>
          </AdminLayout>
        } />

        {/* Main App Routes */}
        <Route path="/*" element={
          <Layout
            pipVideo={pipVideo}
            onClosePip={() => setPipVideo(null)}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          >
            <Routes>
              <Route path="/" element={
                <Dashboard
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              } />
              <Route path="/courses" element={<ExploreCourses searchQuery={searchQuery} handleSearch={handleSearch} />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/learn/:id" element={<CourseLearning setGlobalPip={setPipVideo} />} />
              {/* Fallback for other routes */}
              <Route path="*" element={
                <Dashboard
                  searchQuery={searchQuery}
                  handleSearch={handleSearch}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              } />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
