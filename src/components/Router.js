import React from 'react'
import {
    Routes,
    Route
  } from "react-router-dom";
import Home from '../routes/Home';
import Auth from '../routes/Auth';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

export default function AppRouter ({isLoggedIn, userObj, refreshUser}){
  return (
        <>
        {isLoggedIn && <Navigation userObj={userObj}/>}
        <Routes>
            {isLoggedIn ? (
                <>
                    <Route path="/" element={<Home userObj={userObj}/>} />
                    <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                </>
            ) :
            (
                <Route path="/" element={<Auth />} />
            )
        }
        </Routes>
        </>
 )
};

