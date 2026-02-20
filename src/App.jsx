import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
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
            <MantineProvider>
              <Router>
                <AppRoutes />
                <Toaster />
              </Router>
            </MantineProvider>
          </LearningProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
