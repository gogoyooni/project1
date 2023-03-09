import React, { useState } from 'react'
import { fDoc, fDeleteDoc,dbService,fWhere, fEditDoc } from '../fbase'

export default function Tweet({tweetObj, isOwner}) { 
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.data.text);

    const onToggleSetting = () => {
        setEditing((prev)=> !prev);
        console.log('editing status: ', editing)
    }

    const onClickDeleteData = async () => {
        const ok = window.confirm("Are you sure that you want to delete this tweet?");
        if(ok){
            try {
                const deleteResult = await fDeleteDoc(fDoc(dbService, `tweets`, `${tweetObj.id}`));
                console.log(deleteResult);
            } catch(error){
                console.log(error)
            }
            console.log('deleted data')
        }
    }

    const onSubmitEdittedData = async (e) => {
            e.preventDefault();
            console.log('newTweet', newTweet);
            try {
                const editedTweetRef = fDoc(dbService, `tweets`, `${tweetObj.id}`);

                // update a tweet - 트윗 수정
                await fEditDoc(editedTweetRef, {
                    text: newTweet
                });

                setEditing((prev)=> !prev);

                // console.log(editedResult);
            } catch(error){
                console.log(error)
            }
            console.log('editted data')    
    
    }

    // const onClickEditData = async () => {
        
   
  return (
    <div>
        {
            editing ? (
                <form onSubmit={onSubmitEdittedData}>
                    <input type="text" value={newTweet} onChange={(e)=> setNewTweet(e.target.value)}/>
                    <input type="submit" value="Update Tweet"/>
                    <button onClick={onToggleSetting}>Cancel</button>
                </form>) :(
                <>
                    <h4>{tweetObj.data.text}</h4>    
                    {
                        isOwner && <>
                            <button onClick={onClickDeleteData}>Delete Tweet</button>
                            <button onClick={onToggleSetting}>Edit Tweet</button>
                        </>
                    }
                </> 
                )
        }
         
        
        
                
        

        
    </div>
  )
}
