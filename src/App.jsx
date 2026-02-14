import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { AuthProvider, NotificationProvider, LearningProvider } from '@/contexts';
import ErrorBoundary from '@/components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <LearningProvider>
            <Router>
              <AppRoutes />
            </Router>
          </LearningProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
