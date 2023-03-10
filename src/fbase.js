// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateCurrentUser, updateProfile, } from "firebase/auth";
import {getFirestore, collection, doc, addDoc, getDocs, getDoc, onSnapshot, query,where, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString,getDownloadURL, deleteObject } from 'firebase/storage'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

const firebaseStorage = getStorage(app)

export const authService = getAuth(app);
export const createUser = createUserWithEmailAndPassword;
export const signIn = signInWithEmailAndPassword;
export const fUpdateProfile = updateProfile;
export const fUpdateCurrentUser = updateCurrentUser;

export const fireStore = getFirestore();
export const dbService = db;
export const fAddDoc = addDoc;
export const fCollection = collection;
export const fDoc = doc;
export const fGetDocs = getDocs;
export const fOnSnapshot = onSnapshot;
export const fQuery = query;
export const fWhere = where;
export const fOrderBy = orderBy
export const fDeleteDoc = deleteDoc;
export const fEditDoc = updateDoc;

// Firebase storage
export const fStorage = firebaseStorage;
export const fRef = ref;
export const fUploadString = uploadString;
export const fGetDownloadURL = getDownloadURL;
export const fDeletObject = deleteObject;