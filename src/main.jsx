<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Output from './components/Output.jsx';
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AIResponse from "./components/AiResponse/AiResponse.jsx";
>>>>>>> 05e88705248d076a5e00bcd0e4a13fa2e49352d6

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
<<<<<<< HEAD
    path: "output",
    element: <Output/>,
=======
    path: "results",
    element: <AIResponse />,
>>>>>>> 05e88705248d076a5e00bcd0e4a13fa2e49352d6
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
