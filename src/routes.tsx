import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import ClientList from './pages/ClientList'
import EditClient from './pages/EditClient'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/client-list",
    element: <ClientList />, 
  },
  {
    path: "/edit-client/:id",
    element: <EditClient />, 
  },
])