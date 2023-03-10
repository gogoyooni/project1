import React, {useEffect, useState} from 'react'
import AppRouter from './Router' 
// Router.js에 루트 라우터 설정
import { authService, fUpdateProfile, fUpdateCurrentUser} from '../fbase'
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
          // user 객체가 너무 커서 리액트가 데이터가 바꼈는지 안바꼈는지 구분을 못해서 필요한 데이터만 객체에 저장하여 세팅
          setUserObj({
            displayName: user.displayName ? user.displayName : 'Anonymous',
            uid: user.uid,
            updateProfile: (args) => fUpdateProfile(user, args),
          });
        } else {
          setIsLoggedIn(false);
        }
        setInit(true); // initialize auth status change - 로그인 상태
  
      } catch (error){
        console.log(error)
      }
          })
  }, [])

  // profile에서 유저가 이름을 업데이트 했을때 App에 있는 userObj를 바꿔주기 위한 function
  const refreshUser = async () => {
    const user = authService.currentUser;
    await fUpdateCurrentUser(authService, user);
    
    setUserObj({
      displayName: user.displayName ? user.displayName : 'Anonymous',
      uid: user.uid,
      // updateProfile: (args) => fUpdateProfile(user, { displayName: user.displayName }),
    });
    console.log('App에 있는 userObj', userObj)
  };
  return (
    <>
      {
        init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/> : 'Initializing...'
      }  
    </> 
  );
}

export default App;
