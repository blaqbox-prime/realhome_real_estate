
import './App.css'
import Home from './pages/Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SearchProperties from './pages/SearchProperties';
import RootLayout from './components/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Property from './pages/Property';
import Agents from './pages/Agents';
import AgentDetails from './pages/AgentDetails';
import Dashboard from './pages/Dashboard';
import ManageProperties from './pages/ManageProperties';
import ConfirmSignUp from './pages/ConfirmSignUp';
import Onboarding from './pages/Onboarding';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "properties",
        element: <SearchProperties/>
      },

      {
        path: "properties/:id",
        element: <Property/>
      },
      {
        path: "agents",
        element: <Agents/>
      },
      {
        path: "agents/:id",
        element: <AgentDetails/>
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/confirm-signup",
        element: <ConfirmSignUp />
      },
      {
        path: "/onboarding",
        element: <Onboarding />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/dashboard/manage-properties",
        element: <ManageProperties />
      },

    ]
  },

]);

function App() {
  return (
  <RouterProvider router={router}/>
  )
}

export default App
