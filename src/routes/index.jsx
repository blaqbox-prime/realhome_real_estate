import AgentDetails from "@/pages/AgentDetails";
import Agents from "@/pages/Agents";
import ConfirmSignUp from "@/pages/ConfirmSignUp";
import ContactUs from "@/pages/ContactUs";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import ManageProperties from "@/pages/ManageProperties";
import Onboarding from "@/pages/Onboarding";
import Property from "@/pages/Property";
import SearchProperties from "@/pages/SearchProperties";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import RootLayout from "@/components/RootLayout";

export default [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "contact-us",
            element: <ContactUs />
          },
          {
            path: "properties",
            element: <SearchProperties />
          },
          {
            path: "properties/:id",
            element: <Property />
          },
          {
            path: "agents",
            element: <Agents />
          },
          {
            path: "agents/:id",
            element: <AgentDetails />
          },
          {
            path: "signin",
            element: <SignIn />
          },
          {
            path: "signup",
            element: <SignUp />
          },
          {
            path: "confirm-signup",
            element: <ConfirmSignUp />
          },
          {
            path: "onboarding",
            element: <Onboarding />
          },
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "dashboard/manage-properties",
            element: <ManageProperties />
          }
        ]
      },
    ];