import { handleSecurity } from "../core/security.mjs";
import {initializeApp} from 'https://cdn.skypack.dev/@firebase/app';
import {getDatabase, ref, get, set, onValue} from 'https://cdn.skypack.dev/@firebase/database';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'https://cdn.skypack.dev/@firebase/auth';

import {initAdminData} from '../core/adminData.mjs';
import { checkBan } from "../core/security.mjs";

var login_result;
var email;
var username;
var uid;
var admin = false;


var html_show_to_admin = document.getElementById("show_to_admin");

//------------------------------------------------------------------------------//
//fb_login()
export function fb_login() {
    console.log("fb_login() :: signing in!");
    signInWithPopup(getAuth(), new GoogleAuthProvider())
    .then((result) => {
        parseLoginData(result);
    });
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//serializeLoginData(result)
//result: the result of the login
async function parseLoginData(result) {
    await checkBan();
    
    if (getAuth().currentUser == null) {
        console.warn("parseLoginData()::the user has not logged in successfully yet!");
        return;
    }
    console.log(getAuth().currentUser.uid);
    if (getAuth().currentUser.uid == "MZql8YxZCRZGPSIspMDfHEliY8m1") {
        html_show_to_admin = document.getElementById("show_to_admin");
        html_show_to_admin.style.display = "block";
        admin = true;
        initAdminData();
    }
    var html_favicon = document.getElementById("profile");
    profile.src = getAuth().currentUser.photoURL;
    profile.style.display = "flex";

}
//------------------------------------------------------------------------------//
