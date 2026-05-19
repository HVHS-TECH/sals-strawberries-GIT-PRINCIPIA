//------------------------------------------------------------------------------//
//handleSecurity()
function handleSecurity(txt) {
    if (txt.indexOf('<') != -1 && txt.indexOf('>') != -1) {
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
    if (READ == null) return;
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
