import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Home from '../routes/Home';
import Profile from '../routes/Profile';


export default function Navigation() {
    
  return (
    <nav>
        <ul>
            <li>
                
                    <Link to="/">Home</Link>
                    <Link to="/profile">My Profile</Link>
                    {/* <Route exact path="/profile" element={<Profile/>} /> */}
            </li>
        </ul>
    </nav>
  )
}
