import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from '../routes/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: rootLoader,
    // children: [
    //   {
    //     path: "events/:id",
    //     element: <Event />,
    //     loader: eventLoader,
    //   },
    // ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
    
  );
}

export default App;
