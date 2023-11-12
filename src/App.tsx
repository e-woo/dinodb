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
        path: "/club/:id", // club id
        element: <Clubpage />,
      },
      {
        path: "/event/:id",
        element: <Eventpage />,
      },
      {
        path: "/program/:id",
        element: <Programpage />,
      },
      {
        path: "/volunteer/:id",
        element: <Volunteerpage />,
      },
      {
        path: '/search',
        element: <SearchPage />
      }
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
