import React from 'react'
import { useNavigate } from "react-router-dom";
import { authService } from '../fbase';

export default function Profile() {
  const navigate = useNavigate();
  // const onLogOutClick = () => {
  //   authService.signOut();
    // navigate("/");
  // }
  const onLogOutClick = () => {
    authService.signOut()
    navigate("/");
  }
  return (
    <div>
      <h3>Profile</h3>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  )
}
