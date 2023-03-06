import React, {useEffect, useState} from 'react'
import AppRouter from './Router' 
// Router.js에 루트 라우터 설정
import { authService, createUser } from '../fbase'
import { onAuthStateChanged } from 'firebase/auth'
import Navigation from './Navigation'

function App() {
  
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // console.log(authService.currentUser)
  
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      try {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setInit(true); // initialize auth status change - 로그인 상태
  
      } catch (error){
        console.log(error)
      }
          })
  }, [])
  return (
    <>
      {/* {isLoggedIn && <Navigation />} */}
      {
        init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...'
      }  
    </> 
  );
}

export default App;
