import React from 'react'
import { LoaderFunction, Navigate, createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import File from '../components/File';
import Course from '../components/Course';
import Error from '../pages/Error'
import News from '../pages/News';
import Log from '../pages/Log';
import User from '../pages/User';

export const RoutesList = {
  dashboard: {
    url: `/dashboard`,
    name: `Dashboard`
  },
  login: {
    url: `/`,
    name: `Login`
  },
  profile: {
    url: `profile/`,
    name: `User`
  },
  user: {
    url: `user/:userID/`,
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
    url: `file/:courseFileID/`,
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
    errorElement: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    loader: async() => {
      const response = await fetch("/api/user/loggedin").then(data => data.json());
      if (response === "false") {
        window.location.href = "/";
      } else {
        return { ok: true }
      }
    },
    children: [
      {
        path: RoutesList.dashboard.url,
        element: <Dashboard />
      },
      {
        path: RoutesList.profile.url,
        element: <Profile />,
      },
      {
        path: RoutesList.user.url,
        element: <User />,
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
  }
]);

export default router;