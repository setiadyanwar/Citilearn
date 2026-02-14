import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// Layouts
import { Layout } from '@/layouts/Layout';
import AdminLayout from '@/layouts/AdminLayout';

// Auth Features
import { LoginPage } from '@/features/auth';

// Dashboard Features
import Dashboard from '@/features/dashboard/routes/Dashboard';

// Courses Features
import ExploreCourses from '@/features/courses/routes/ExploreCourses';
import CourseDetail from '@/features/courses/routes/CourseDetail';

// Learning Features
import CourseLearning from '@/features/learning/routes/CourseLearning';
import FocusTest from '@/features/learning/routes/FocusTest';

// Admin Features
import {
    AdminDashboard,
    CourseManagement,
    CourseEditor,
    ModuleEditor,
    LessonEditor,
    AssessmentManager,
    QuestionEditor,
    UserAssignment
} from '@/features/admin';

export const AppRoutes = () => {

    const routes = useRoutes([
        // Auth Routes
        { path: '/login', element: <LoginPage /> },

        // Focus Test (No Layout)
        { path: '/exam/:courseId/:lessonId', element: <FocusTest /> },

        // Admin Routes
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                { path: '', element: <AdminDashboard /> },
                { path: 'courses', element: <CourseManagement /> },
                { path: 'courses/create', element: <CourseEditor /> },
                { path: 'course/:id/edit', element: <CourseEditor /> },
                { path: 'course/:courseId/module/new', element: <ModuleEditor /> },
                { path: 'course/:courseId/module/:moduleId', element: <ModuleEditor /> },
                { path: 'course/:courseId/module/:moduleId/lesson/new', element: <LessonEditor /> },
                { path: 'course/:courseId/module/:moduleId/lesson/:lessonId', element: <LessonEditor /> },
                { path: 'course/:courseId/assessment/:assessmentType', element: <AssessmentManager /> },
                { path: 'course/:courseId/assessment/:assessmentType/question/new', element: <QuestionEditor /> },
                { path: 'course/:courseId/assessment/:assessmentType/question/:questionId', element: <QuestionEditor /> },
                { path: 'course/:courseId/assign', element: <UserAssignment /> },
                { path: '*', element: <AdminDashboard /> }
            ]
        },

        // Main App Routes (with Main Layout)
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '', element: <Dashboard /> },
                { path: 'courses', element: <ExploreCourses /> },
                { path: 'course/:id', element: <CourseDetail /> },
                { path: 'learn/:id', element: <CourseLearning /> },
                { path: '*', element: <Dashboard /> }
            ]
        }
    ]);

    return routes;
};
