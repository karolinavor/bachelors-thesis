import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
    url: `course/test/`,
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
    url: `file/test/`,
    name: `Soubor`
  },
  user: {
    url: `user/test/`,
    name: `Uživatel`
  },
  error: {
    url: `*`,
    name: `Error`
  },
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.dashboard.url} element={<Layout />} >
          <Route index element={<Dashboard />} />

          <Route path={RoutesList.textpage.url} element={<Textpage />} />

          <Route path={RoutesList.login.url} element={<Login />} />

          <Route path={RoutesList.settings.url} element={<Settings />} />

          <Route path={RoutesList.user.url} element={<Profile />} /> {/* :userId */}

          <Route path={RoutesList.course.url} element={<Course />} />

          <Route path={RoutesList.course.url + RoutesList.editCourse.url} element={<CourseEdit />} /> {/* :coursetId */}

          <Route path={RoutesList.course.url + RoutesList.addCourse.url} element={<CourseEdit />} />

          <Route path={RoutesList.course.url + RoutesList.file.url} element={<File />} /> {/* :fileId */}

          <Route path={RoutesList.error.url} element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
