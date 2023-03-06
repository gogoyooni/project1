import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import {authService, createUser, signIn} from '../fbase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword ] = useState('')
  const [newAccount , setNewAccount ] = useState(true)
  const [error, setError] = useState('');

  const toggleAccount = () => {
    setNewAccount((prev) => !prev)
  }

  const onChange = (e) => {
    console.log(e.target.name)
    if (e.target.name === "email"){
      setEmail(e.target.value);
      // console.log('email:',email);
    } else {
      setPassword(e.target.value);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (newAccount){
        // 새 계정 만들기 - create a new account
        data = await createUser(authService, email, password);
        console.log(data)
        // setNewAccount((prev)=> {return !prev}) 
      } else {
        // login 
        data = await signIn(authService, email, password);
        console.log(data)
      }
    } catch (error){
      setError(error.message)
    }  
  }

  const onSocialClick = async (e) => {
    // console.log(e.target.name);
    let provider;

    if(e.target.name == "google"){
      
      // when google login btn is clicked
      provider = await new GoogleAuthProvider();
    } else if (e.target.name == "github") {
      // when github login btn is clicked
      provider = await new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  }

  return (
    <div>
      <h3>Auth 페이지</h3>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" required placeholder="Email" onChange={onChange}/>     
        <input type="password" name="password" required placeholder="Password" onChange={onChange} />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
        {error}
      </form>
      <span onClick={toggleAccount}>{ newAccount ? 'Sign In' : 'New Account'}</span>
      <div>
        <button onClick={onSocialClick} name='google'>Continue with Google</button>
        <button onClick={onSocialClick} name='github'>Continue with Github</button>
      </div>
    </div>
  );
}
