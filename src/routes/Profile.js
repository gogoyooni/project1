import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { authService,fQuery, fCollection, dbService, fWhere,fOrderBy, fOnSnapshot, fUpdateProfile} from '../fbase';

export default function Profile({userObj, refreshUser}) {
  const [myTweets, setMyTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut()
    navigate("/");
  }

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log('디스플레이 네임', userObj.displayName, 'newDisplayName', newDisplayName)
    if (userObj.displayName !== newDisplayName) {
      // await userObj.updateProfile(Object.assign(userObj, {displayName: newDisplayName}));
      await fUpdateProfile(authService.currentUser, { displayName: newDisplayName });
      // await userObj.updateProfile(Object.assign(userObj, {displayName: newDisplayName}));
      refreshUser();
    }
  };

  useEffect(() => {
    const getMyTweets = async () => {
      const q = fQuery(fCollection(dbService, "tweets"), fWhere("creatorId", "==", userObj.uid), fOrderBy("createdAt", "desc"));
      const data = await fOnSnapshot(q, (snapshot) => {
        const texts = snapshot.docs.map((doc) => {
          console.log(doc)
        // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          return {
            id: doc.id, 
            data: doc.data()
          }
        })
        setMyTweets(texts)
      });
      console.log("profile data: ", data);
    }
    getMyTweets();
    console.log('my Tweets -', myTweets)
  }, [])
  return (
    <div>
      <h3>Profile</h3>
      <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
      <div>
        {
          myTweets.map(tweet => {
            return <p key={tweet.id}>{tweet.data.text}</p>
          })
        }
      </div>
      {/* <button onClick={onLogOutClick}>Log out</button> */}
    </div>
  )
}
