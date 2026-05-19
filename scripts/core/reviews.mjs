import { handleSecurity } from "./security.mjs";
import {initializeApp} from 'https://cdn.skypack.dev/@firebase/app';
import {getDatabase, ref, get, set, onValue} from 'https://cdn.skypack.dev/@firebase/database';
import {getAuth} from 'https://cdn.skypack.dev/@firebase/auth';
import { fb_read, fb_write } from "../firebase/fb_io.mjs";



//------------------------------------------------------------------------------//
//submitReview()
export function submitReview() {
    if (getAuth().currentUser == null) {
        console.warn("submitReview(): user not logged in!");
        return;
    }
    
    var html_review = document.getElementById("review");
    var review = html_review.value;
    const MAX_LENGTH = 500;
    if (handleSecurity(review)) {
        fb_write("sals-strawberries/reviews/" + getAuth().currentUser.uid + "/review", '', review.slice(0, MAX_LENGTH));
        fb_write("sals-strawberries/reviews/" + getAuth().currentUser.uid + "/name", '', getAuth().currentUser.displayName);
    }
    

    
}
//------------------------------------------------------------------------------//



//------------------------------------------------------------------------------//
//updateReviewsList()
export async function updateReviewsList() {
    var html_reviews = document.getElementById("reviews");
    var reviews = await fb_read('sals-strawberries/reviews/');

    const KEYS = Object.keys(reviews);
    //Reset reviews list
    html_reviews.innerHTML = "";

    for (var i = 0; i < KEYS.length; i++) {
        const VAL = reviews[KEYS[i]];
        const NAME = VAL.name;
        var rev = String(VAL.review);
        console.log(rev);
        rev = rev.replaceAll('onerror', '');
        rev = rev.replaceAll('onload', '');
        rev = rev.replaceAll('onchange', '');
        rev = rev.replaceAll('onsubmit', '');
        rev = rev.replaceAll('oninput', '');
        rev = rev.replaceAll('onclick', '');
        rev = rev.replaceAll('script', '');
        rev = rev.replaceAll('<', '');
        rev = rev.replaceAll('>', '');
        console.log(rev);
        
        html_reviews.innerHTML += "<h3>" + NAME + " says: </h3>";
        html_reviews.innerHTML += "<p>" + rev + "</p>";
    }
}
//------------------------------------------------------------------------------//