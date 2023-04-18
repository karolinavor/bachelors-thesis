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
    name: `Přihlášení`
  },
  settings: {
    url: `settings/`,
    name: `Nastavení`
  },
  course: {
    url: `course/:course/`,
    name: `Kurz`
  },
  editCourse: {
    url: `edit/`,
    name: `Editovat kurz`
  },
  addCourse: {
    url: `add/`,
    name: `Přidat kurz`
  },
  file: {
    url: `file/:file/`,
    name: `Soubor`
  },
  profile: {
    url: `user/:user/`,
    name: `Uživatel`
  },
  error: {
    url: `*`,
    name: `Error`
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
      path: RoutesList.profile.url, /* :userId */
      element: <Profile />,
    },
    {
      path: RoutesList.course.url,
      element: <Course />,
      children: [
        {
          path: RoutesList.file.url, /* :fileId */
          element: <File />,
        },
      ]
    },
    {
      path: RoutesList.course.url + RoutesList.editCourse.url,  /* :coursetId */
      element: <CourseEdit />,
    },
    {
      path: RoutesList.course.url + RoutesList.addCourse.url,
      element: <CourseEdit />,
    },
  ],
}]);

export default router;
