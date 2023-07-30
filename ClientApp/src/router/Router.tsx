import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from '../pages/Layout';
import Dashboard from '../pages/Dashboard';
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import File from '../components/File';
import Course from '../components/Course';
import Error from '../pages/Error'
import News from '../pages/News';
import Log from '../pages/Log';

export const RoutesList = {
  dashboard: {
    url: `/`,
    name: `Dashboard`
  },
  login: {
    url: `login/`,
    name: `Login`
  },
  user: {
    url: `user/:user/`,
    name: `User`
  },
  settings: {
    url: `settings/`,
    name: `Settings`
  },
  news: {
    url: `news`,
    name: `News`
  },
  course: {
    url: `course/:courseID/`,
    name: `Course`
  },
  file: {
    url: `file/:fileID/`,
    name: `File`
  },
  error: {
    url: `*`,
    name: `Error`
  },
  log: {
    url: `log`,
    name: `Log`
  }
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
      path: RoutesList.user.url,
      element: <Profile />,
    },
    {
      path: RoutesList.news.url,
      element: <News />,
    },
    {
      path: RoutesList.log.url,
      element: <Log />,
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
