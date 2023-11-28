import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/homepage/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Clubpage from "./pages/clubpage/Clubpage";
import Eventpage from "./pages/eventpage/Eventpage";
import Programpage from "./pages/programpage/Programpage";
import Volunteerpage from "./pages/volunteerpage/Volunteerpage";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import SearchPage from "./pages/searchpage/SearchPage";
import Announcements from "./pages/announcementslist/Announcements";
import Announcement from "./pages/announcementpage/Announcement";
import CreatePage from "./pages/createpage/CreatePage";
import AdminPage from "./pages/adminpage/admin";
import ProfilePage from "./pages/profilepage/profile";
import CreateAnnouncement from "./pages/createpage/CreateAnnouncement";
import EditClubpage from "./pages/clubpage/EditClubpage";
import EditEventPage from "./pages/eventpage/EditEventpage";
import CreateEventPage from "./pages/createpage/CreateEventpage";
import EditProgramPage from "./pages/programpage/EditProgrampage";
import EditVolunteerPage from "./pages/volunteerpage/EditVolunteerpage";
import EditProfile from "./pages/profilepage/editprofile";
import EditPassword from "./pages/profilepage/editpassword";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/club/:id",
        element: <Clubpage />,
      },
      {
        path: "club/:id/edit",
        element: <EditClubpage />
      },
      {
        path: "/event/:id",
        element: <Eventpage />,
      },
      {
        path: "/event/:id/edit",
        element: <EditEventPage />
      },
      {
        path: "/event/:id/create",
        element: <CreateEventPage />
      },
      {
        path: "/program/:id",
        element: <Programpage />,
      },
      {
        path: "/program/:id/edit",
        element: <EditProgramPage />
      },
      {
        path: "/volunteer/:id",
        element: <Volunteerpage />,
      },
      {
        path: "/volunteer/:id/edit",
        element: <EditVolunteerPage />
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/announcements",
        element: <Announcements />,
      },
      {
        path: "/announcement/:id",
        element: <Announcement />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
      {
        path: "/announce",
        element: <CreateAnnouncement />
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: '/profile/edit',
        element: <EditProfile />
      },
      {
        path: '/profile/editpassword',
        element: <EditPassword />
      },
      {
        path: "/admin/",
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
