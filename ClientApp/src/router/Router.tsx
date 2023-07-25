import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../pages/Layout';
import Dashboard from '../pages/Dashboard';
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import File from '../components/File';
import Course from '../components/Course';
import Settings from '../pages/Settings';
import Error from '../pages/Error'
import Textpage from '../pages/Textpage';
import NewsPage from '../pages/NewsPage';

export const RoutesList = {
  dashboard: {
    url: `/`,
    name: `Dashboard`
  },
  textpage: {
    url: `textpage/`,
    name: `Textpage`
  },
  login: {
    url: `login/`,
    name: `Login`
  },
  settings: {
    url: `settings/`,
    name: `Settings`
  },
  course: {
    url: `course/:courseId/`,
    name: `Course`
  },
  file: {
    url: `file/:fileId/`,
    name: `File`
  },
  user: {
    url: `user/:user/`,
    name: `User`
  },
  error: {
    url: `*`,
    name: `Error`
  },
  news: {
    url: `news`,
    name: `News`
  },
}

const router = createBrowserRouter([
{
  path: RoutesList.login.url,
  element: <Login />,
},
{
  path: "/",
  element: <Layout />,
  errorElement: <Error />,
  children: [
    {
      index: true,
      element: <Dashboard />
    },
    {
      path: RoutesList.textpage.url,
      element: <Textpage />,
    },
    {
      path: RoutesList.settings.url,
      element: <Settings />,
    },
    {
      path: RoutesList.user.url,
      element: <Profile />,
    },
    {
      path: RoutesList.news.url,
      element: <NewsPage />,
    },
    {
      path: RoutesList.course.url,
      element: <Course />,
      children: [
        {
          path: RoutesList.file.url,
          element: <File />,
        }
      ]
    }
  ],
}]);

export default router;
