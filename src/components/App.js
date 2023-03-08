import React, {useEffect, useState} from 'react'
import AppRouter from './Router' 
// Router.js에 루트 라우터 설정
import { authService} from '../fbase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null);

  // console.log(authService.currentUser)
  
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      try {
        if (user) {
          setIsLoggedIn(true);
          setUserObj(user)
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
        init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : 'Initializing...'
      }  
    </> 
  );
}

export default App;
