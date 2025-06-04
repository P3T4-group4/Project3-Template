// client/src/main.tsx
// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import client from './utils/apolloClient'; // ← import our new Apollo client
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchPage from './pages/Search';
import Library from './pages/Library';
import Calendar from './pages/Calendar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/library',
    element: (
      <ProtectedRoute>
        <Library />
      </ProtectedRoute>
    ),
  },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute>
        <Calendar />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile/:profileId',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
