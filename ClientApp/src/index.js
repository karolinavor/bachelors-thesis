import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './styles/style.scss';

import { store } from './store/store'
import { Provider } from 'react-redux'
import router from './router/Router';
import ToastNotificationsProvider from "./components/ToastNotification/ToastNotificationsProvider"
import ModalProvider from './components/Modal/ModalProvider'
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastNotificationsProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>  
      </ToastNotificationsProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
