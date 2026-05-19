import {initializeApp} from 'https://cdn.skypack.dev/@firebase/app';
import {getDatabase, ref, set} from 'https://cdn.skypack.dev/@firebase/database';
import {getAuth, setPersistence, browserSessionPersistence} from 'https://cdn.skypack.dev/@firebase/auth';
//------------------------------------------------------------------------------//
//firebase config
//used to initialize firebase access
const firebaseConfig = {
  apiKey: "AIzaSyCg_wVQVx1Jr6JcXnxIjs58owZ9laB7Llo",
  authDomain: "alex-curwen-12comp.firebaseapp.com",
  databaseURL: "https://alex-curwen-12comp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "alex-curwen-12comp",
  storageBucket: "alex-curwen-12comp.firebasestorage.app",
  messagingSenderId: "842988938683",
  appId: "1:842988938683:web:d4ddeaa78536ac10b9109e"
};


//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//fb_init()
// Initialize Firebase
export function fb_init() {
    initializeApp(firebaseConfig);
    console.log("Firebase initialized");
}
//------------------------------------------------------------------------------//
