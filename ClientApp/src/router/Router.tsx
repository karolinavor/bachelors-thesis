import React from 'react'
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../pages/Layout';
import Dashboard from '../pages/Dashboard';
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import File from '../components/File';
import Course from '../components/Course/Course';
import CourseEdit from '../components/Course/CourseEdit';
import Settings from '../pages/Settings';
import Error from '../pages/Error'
import Textpage from '../pages/Textpage';
import CourseAdd from '../components/Course/CourseAdd';
import NewsPage from '../pages/NewsPage';
import NewsAdd from '../components/News/NewsAdd';

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
  courseEdit: {
    url: `/course/:courseId/edit/`,
    name: `Edit course`
  },
  courseAdd: {
    url: `/course/add/`,
    name: `Add course`
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
  newsAdd: {
    url: `news/add`,
    name: `News Add`
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
      path: RoutesList.newsAdd.url,
      element: <NewsAdd />,
    },
    {
      path: RoutesList.courseAdd.url,
      element: <CourseAdd />,
    },
    {
      path: RoutesList.courseEdit.url,
      element: <CourseEdit />
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
