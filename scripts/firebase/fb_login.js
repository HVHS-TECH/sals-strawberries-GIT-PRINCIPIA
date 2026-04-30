

var login_result;
var email;
var username;
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

    email = login_result.user.email;
}
//------------------------------------------------------------------------------//