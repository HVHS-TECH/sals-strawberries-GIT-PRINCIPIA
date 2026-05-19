//------------------------------------------------------------------------------//
//handleSecurity()
function handleSecurity(txt) {
    if (txt.find('<') != -1 && txt.find('>') != -1) {
        ban();
        return false;
    }
    return true;
}
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
//ban()
function ban() {
    fb_write('sals-strawberries/bans/' + firebase.auth().currentUser.uid, '', true);
    redirect();
}
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
//checkBan()
async function checkBan() {
    const READ = await fb_read('sals-strawberries/bans/' + firebase.auth().currentUser.uid);
    if (READ.val()) {
        redirect();
    }
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//redirect()
function redirect() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; //Muahaha
}
//------------------------------------------------------------------------------//