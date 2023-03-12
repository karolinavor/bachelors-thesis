import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '../pages/Layout';
import Dashboard from '../pages/Dashboard';
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import FileDetail from '../components/Files/FileDetail';
import Course from '../components/Course/Course';
import CourseEdit from '../components/Course/CourseEdit';
import ResetPassword from '../pages/ResetPassword';
import ForgottenPassword from '../pages/ForgottenPassword';
import Files from '../components/Files/Files';
import Settings from '../pages/Settings';
import Error from '../pages/Error'

const RoutesList = {
  dashboard: {
    url: `/`,
    name: `Dashboard`
  },
  register: {
    url: `register`,
    name: `Registrace`
  },
  login: {
    url: `login`,
    name: `Přihlášení`
  },
  forgottenPassword: {
    url: `forgotten-password`,
    name: `Zapomenuté heslo`
  },
  resetPassword: {
    url: `reset-password`,
    name: `Resetovat heslo`
  },
  settings: {
    url: `settings`,
    name: `Nastavení`
  },
  course: {
    url: `courses/xtest`,
    name: `Kurz`
  },
  editCourse: {
    url: `courses/xtest/edit`,
    name: `Editovat kurz`
  },
  addCourse: {
    url: `courses/add`,
    name: `Přidat kurz`
  },
  files: {
    url: `files`,
    name: `Soubory`
  },
  file: {
    url: `courses/xtest/files/file-test`,
    name: `Soubor`
  },
  user: {
    url: `user/root`,
    name: `Uživatel`
  },
  error: {
    url: `*`,
    name: `Error`
  },
}

export default function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.dashboard.url} element={<Layout />} >
          <Route index element={<Dashboard />} />

          <Route path={RoutesList.login.url} element={<Login />} />

          <Route path={RoutesList.register.url} element={<Register />} />

          <Route path={RoutesList.forgottenPassword.url} element={<ForgottenPassword />} />

          <Route path={RoutesList.resetPassword.url} element={<ResetPassword />} />

          <Route path={RoutesList.settings.url} element={<Settings />} />

          <Route path={RoutesList.user.url} element={<Profile />} /> {/* :userId */}

          <Route path={RoutesList.course.url} element={<Course />}>
            <Route path={RoutesList.files.url} element={<Files />} />
          </Route>
        
          <Route path={RoutesList.editCourse.url} element={<CourseEdit />} /> {/* :coursetId */}

          <Route path={RoutesList.addCourse.url} element={<CourseEdit />} />

          <Route path={RoutesList.file.url} element={<FileDetail />} /> {/* :fileId */}

          <Route path={RoutesList.error.url} element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
