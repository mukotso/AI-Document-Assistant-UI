import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../components/layout/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import DocumentsPage from '../pages/DocumentsPage';
import DocumentsPreview from '../pages/DocumentPreview';
import MyDocumentsPage from '../pages/MyDocumentsPage';
import UsersPage from '../pages/UsersPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'dashboard',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: 'documents',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DocumentsPage />,
          },
          {
            path: 'uploads', 
            element: <DocumentsPreview />,
          },
        ],
      },

      {
        path: 'docs',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <MyDocumentsPage />,
          },
        ],
      },
      {
        path: 'users',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
        ],
      },
    ],
  },
]);
