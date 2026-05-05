

var login_result;
var email;
var username;
var uid;
var admin = false;


var html_show_to_admin = document.getElementById("show_to_admin");
//------------------------------------------------------------------------------//
//fb_login()
function fb_login() {
    console.log("fb_login() :: signing in!");
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        parseLoginData(result);
    });
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//serializeLoginData(result)
//result: the result of the login
async function parseLoginData(result) {
    login_result = result;
    if (login_result == null) {
        console.warn("parseLoginData()::the user has not logged in successfully yet!");
        return;
    }
    username = login_result.additionalUserInfo.profile.name;
    uid = login_result.user.uid;
    email = login_result.user.email;
    console.log(uid);
    if (uid == "MZql8YxZCRZGPSIspMDfHEliY8m1") {
        html_show_to_admin = document.getElementById("show_to_admin");
        html_show_to_admin.style.display = "block";
        admin = true;
        initAdminData();
    }
}
//------------------------------------------------------------------------------//