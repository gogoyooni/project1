import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Profile from '../routes/Profile';
import Navigation from './Navigation';


// const useRouter = ({isLoggedIn}) => {
//     // const router = createBrowserRouter([
//     //     {
//     //       path: "/",
//     //       element: isLoggedIn ? <Home /> : <Auth />,
//     //     },
//     //     {
//     //       path: "/edit-profile",
//     //       element: isLoggedIn && <EditProfile />,
//     //     },
//     //     {
//     //       path: "/profile",
//     //       element: isLoggedIn && <Profile />,
//     //     },
//     // ]);

//     const router = createBrowserRouter(
//         createRoutesFromElements(
//             // <Route path='/'  element={<Root />} >
//             <>
//                 <Route path='/' element={isLoggedIn ? <Home /> : <Auth />}/>
//                 <Route path="/profile" element={isLoggedIn ? <Profile /> : <Auth />} />
//             </>
//             // </Route>
//         )
//     )
//     return router
// }


// export default function Router({isLoggedIn}) {
//     const router = useRouter({isLoggedIn})    
//   return (
//     <RouterProvider router={router}/> 
//  )
// }
export default function AppRouter ({isLoggedIn}){
  return (
    // <Router>
        <>
        {isLoggedIn && <Navigation />}
        <Routes>
            {isLoggedIn ? (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </>
            ) :
            (
                <Route path="/" element={<Auth />} />
            )
        }
        </Routes>
        </>
    // </Router>
 )
};

