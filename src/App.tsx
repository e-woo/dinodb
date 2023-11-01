import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Clubpage from './pages/Clubpage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Layout = () => {
	return (
	<>
		<Navbar/>
		<Home/>
		<Footer/>
	</>);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
		children: [
			{
				path: "/",
				element: <Home/>
			},
			{
				path: "/Clubpage/:id",	// club id
				element: <Clubpage/>
			}
		]
  },
	{
		path: "/login",
		element: <Login/>
	},
	{
		path: "/register",
		element: <Register/>
	}
]);

function App() {
  return (
    <div className="app">
			<div className="container">
				<RouterProvider router={router}/>
			</div>
		</div>
  );
}



export default App;
