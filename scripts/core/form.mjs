import { checkBan, handleSecurity } from "./security.mjs";
import {initializeApp} from 'https://cdn.skypack.dev/@firebase/app';
import {getDatabase, ref, get, set, onValue} from 'https://cdn.skypack.dev/@firebase/database';
import {getAuth} from 'https://cdn.skypack.dev/@firebase/auth';
import { fb_write, fb_addWriteListener } from "../firebase/fb_io.mjs";
import { updateReviewsList } from "./reviews.mjs";

var html_name = document.getElementById("name");
var html_fav_fruit = document.getElementById("favouriteFruit");
var html_fruit_qnty = document.getElementById("fruitQuantity");

var init = false;


//------------------------------------------------------------------------------//
//submit()
//submit the form data
export function submit() {
    var formdata = getFormData();
    if (getAuth().currentUser.uid == null) return;
    if (getAuth().currentUser.email == null || formdata.name == "" || formdata.favFruit == "" || formdata.fruitQnty == "") return;
    
    if (
        !handleSecurity(formdata.name, true) ||
        !handleSecurity(formdata.favFruit, true) ||
        !handleSecurity(formdata.fruitQnty, true)
    ) {
        return;
    }

    
    
    fb_write("sals-strawberries/formdata/" + getAuth().currentUser.uid + "/email", '', getAuth().currentUser.email);
    fb_write("sals-strawberries/formdata/" + getAuth().currentUser.uid + "/name", '', formdata.name);
    fb_write("sals-strawberries/formdata/" + getAuth().currentUser.uid + "/favFruit", '', formdata.favFruit);
    fb_write("sals-strawberries/formdata/" + getAuth().currentUser.uid + "/fruitQnty", '', formdata.fruitQnty);

    var html_thanks_for_answering = document.getElementById("thanks_for_answering");
    var html_delete_on_submit = document.getElementById("delete_on_submit");
    var html_recipient = document.getElementById("recipient");
    

    html_delete_on_submit.remove();

    html_thanks_for_answering.style.display = "block";
    
    html_recipient.innerHTML = "To: <i>" + getAuth().currentUser.email + "</i> ( " + formdata.name + " )";


    fb_addWriteListener('sals-strawberries/reviews', updateReviewsList);
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//getFormData()
function getFormData() {
    console.log("getFormData()");
    var formdata = {name: "", favFruit: "", fruitQnty: 0};
    html_name = document.getElementById("name");
    html_fav_fruit = document.getElementById("favouriteFruit");
    html_fruit_qnty = document.getElementById("fruitQuantity");
    formdata.name = html_name.value;
    formdata.favFruit = html_fav_fruit.value;
    formdata.fruitQnty = html_fruit_qnty.value;
    return formdata;
}
//------------------------------------------------------------------------------//