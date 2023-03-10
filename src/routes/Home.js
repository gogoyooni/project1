import { orderBy } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import Tweet from '../components/Tweet';
import { dbService, fireStore, fAddDoc, fCollection, fGetDocs, fOnSnapshot, fQuery, fWhere, fOrderBy, fRef, fUploadString, fStorage, fGetDownloadURL } from '../fbase';
import { v4 as uuidv4 } from 'uuid';

export default function Home({userObj}) {
  console.log(userObj)
  const [isLoaded, setIsLoaded] = useState(false);
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState('');

  const getTweets = async () => {
    // const q = fQuery(fCollection(dbService, "tweets"), fWhere("creatorId", "==", userObj.uid), fOrderBy("createdAt", "desc"));
    const q = fQuery(fCollection(dbService, "tweets"), fOrderBy("createdAt", "desc"));
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
    let downloadedImgURL = "";
    // 유저가 사진을 업로드 안했을 경우
    if( attachment != ""){
      
      // uid 기준으로 버킷 폴더를 구분 / uuid를 활용해서 사진도 구분
      const storageRef = fRef(fStorage, `${userObj.uid}/${uuidv4()}`);

      // Raw string is the default if no format is provided
      const response = await fUploadString(storageRef, attachment, 'data_url').then(async (snapshot) => {
        console.log('Uploaded the image URL in a raw string!');
      });

      console.log('response::', response)

      // get downloadURL for the image - 유저가 업로드한 사진의 URL을 받는다
      downloadedImgURL = await fGetDownloadURL(storageRef).then((downloadURL) => {
        console.log('File available at', downloadURL);
        return downloadURL;
      });
    }

    try{
      await fAddDoc(fCollection(dbService, "tweets"), {
        creatorId: userObj.uid,
        text: tweet,
        createdAt: Date.now(),
        imgURL: downloadedImgURL
      });
      setTweet("");
      setAttachment(null);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error){
      console.log(error)
    }
    
    
  }
  const onFileChange = (e) => {
    const imgFile = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (finishedEvent) => {
      const imgData = finishedEvent.currentTarget.result;
      setAttachment(imgData);

    }
    fileReader.readAsDataURL(imgFile);
  }
  const onClearAttachment = () => {
    setAttachment(null);
  }

  // console.log(tweets)
  return (
    <div>
      <form onSubmit={onSubmit}> 
        <input type="text" value={tweet} onChange={onChange} placeholder="what's on your mind?" maxLength={120}/>
        <input type="file" accept='image/*' onChange={onFileChange}/>
        <input type="submit"  value='Tweet'/>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {tweets.map(tweet => {
          return <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.data.creatorId == userObj.uid}/>
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
