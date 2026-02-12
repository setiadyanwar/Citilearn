import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ExploreCourses from './pages/ExploreCourses';
import CourseDetail from './pages/CourseDetail';
import CourseLearning from './pages/CourseLearning';
import LoginPage from './pages/Login';

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
