import { orderBy } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { dbService, fireStore, fAddDoc, fCollection, fGetDocs, fOnSnapshot, fQuery, fWhere, fOrderBy } from '../fbase';

export default function Home({userObj}) {
  console.log(userObj)
  const [isLoaded, setIsLoaded] = useState(false);
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const q = fQuery(fCollection(dbService, "tweets"), fWhere("creatorId", "==", userObj.uid), fOrderBy("createdAt", "desc"));
    // realtime updates from firestore
    await fOnSnapshot(q, (snapshot) => {
        const texts = snapshot.docs.map((doc) => {
          console.log(doc)
        // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          return {
            id: doc.id, 
            data: doc.data()
          }
        })
        setTweets(texts)
      });
      
  }
  useEffect(() => {
    getTweets();
  
  }, [])
  const onChange = (e) => {
    console.log(e.target.value);
    setTweet(e.target.value);
  }
  const onSubmit = async (e) => {
    e.preventDefault(); 
    const docRef = await fAddDoc(fCollection(dbService, "tweets"), {
      creatorId: userObj.uid,
      text: tweet,
      createdAt: Date.now()
    });
    setTweet("")
    console.log("Document written with ID: ", docRef.id);
  }
  console.log(tweets)
  return (
    <div>
      <form onSubmit={onSubmit}> 
        <input type="text" value={tweet} onChange={onChange} placeholder="what's on your mind?" maxLength={120}/>
        <input type="submit"  value='Tweet'/>
      </form>
      <div>
        {tweets.map(tweet => {
          return <li key={tweet.id}>{tweet.data.text}</li>
        })}
      </div>
      {/* {
        isLoaded ? (<div>
          <ul>
            {
              tweets.map(tweet => {
                return <li key={tweet.id}>{tweet.tweet}</li>
              })
            }
          </ul>
        </div>) : 'Loading...'
      } */}
      
    </div>
  )
}
