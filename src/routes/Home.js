import { orderBy } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { dbService, fireStore, fAddDoc, fCollection, fGetDocs, fOnSnapshot, fQuery } from '../fbase';

export default function Home({userObj}) {
  console.log(userObj)
  const [isLoaded, setIsLoaded] = useState(false);
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const querySnapshot = await fGetDocs(fCollection(dbService, "tweets"));
    // console.log(querySnapshot)
      let newTweets = querySnapshot.docs.map((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        return {
          id: doc.id, 
          data: doc.data()
        }
      });
      setTweets(newTweets)
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
    // if(e.target.value.length < 1) return 
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
          return <li key={tweet.id}>{tweet.data.tweet}</li>
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
