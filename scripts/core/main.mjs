import { fb_init } from "../firebase/fb_init.mjs";
import { submitReview, updateReviewsList } from "./reviews.mjs";
import { fb_login } from "../firebase/fb_login.mjs";
import { submit } from "./form.mjs";

main();
//------------------------------------------------------------------------------//
//main()
function main() {
    console.log("main()");
    fb_init();
    window.login = ()=>{fb_login();};
    window.submitF = ()=>{submit();};
    window.submitR = ()=>{submitReview();}; 
    addEventListener("load", updateReviewsList);
}
//------------------------------------------------------------------------------//


