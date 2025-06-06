import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProtectedRoute from "./libs/ProtectRouter.jsx";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './page/Login.jsx'
import Register from './page/Register.jsx'
import Home from './page/Home.jsx'
import UserFirstPage from './page/UserFirstPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/UserFirstPage',
    element: <UserFirstPage />,
    
  },
  {
    path: '/Home',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
