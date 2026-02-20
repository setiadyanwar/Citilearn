import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@/routes';
import { AuthProvider, NotificationProvider, LearningProvider } from '@/contexts';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <LearningProvider>
            <Router>
              <AppRoutes />
              <Toaster />
            </Router>
          </LearningProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
