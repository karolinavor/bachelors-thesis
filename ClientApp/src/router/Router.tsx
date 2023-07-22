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
    url: `course/:id/`,
    name: `Kurz`
  },
  courseEdit: {
    url: `/course/:id/edit/`,
    name: `Editovat kurz`
  },
  courseAdd: {
    url: `/course/add/`,
    name: `Přidat kurz`
  },
  file: {
    url: `file/:id/`,
    name: `Soubor`
  },
  user: {
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
      path: RoutesList.user.url,
      element: <Profile />,
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
