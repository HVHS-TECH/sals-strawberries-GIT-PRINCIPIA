import { fb_write, fb_read } from "../firebase/fb_io.mjs";
import {getAuth, setPersistence, browserSessionPersistence} from 'https://cdn.skypack.dev/@firebase/auth';
//------------------------------------------------------------------------------//
//handleSecurity()
export function handleSecurity(txt) {
    const MIGHT_HAVE_TAG = txt.indexOf('<') != -1 && txt.indexOf('>') != -1;

    //run when loaded
    const MIGHT_HAVE_ONERROR = txt.indexOf('onerror') != -1;
    const MIGHT_HAVE_ONLOAD = txt.indexOf('onload') != -1;

    //e.g buttons
    const MIGHT_HAVE_ONCLICK = txt.indexOf('onclick') != -1;

    //inputs
    const MIGHT_HAVE_ONCHANGE = txt.indexOf('onchange') != -1;
    const MIGHT_HAVE_ONINPUT = txt.indexOf('oninput') != -1;
    const MIGHT_HAVE_ONSUBMIT = txt.indexOf('onsubmit') != -1;

    //script
    const MIGHT_HAVE_SCRIPT = txt.indexOf('script') != -1;


    const MIGHT_HAVE_MALICIOUS_TAG_TEXT = 
    MIGHT_HAVE_ONERROR || 
    MIGHT_HAVE_ONLOAD || 
    MIGHT_HAVE_ONCLICK || 
    MIGHT_HAVE_ONCHANGE || 
    MIGHT_HAVE_ONINPUT || 
    MIGHT_HAVE_ONSUBMIT || 
    MIGHT_HAVE_SCRIPT;

    const MIGHT_HAVE_MALICIOUS_TAG = MIGHT_HAVE_MALICIOUS_TAG_TEXT && MIGHT_HAVE_TAG;

    if (MIGHT_HAVE_MALICIOUS_TAG) {
        ban();
        return false;
    }
    return true;
}
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
//ban()
function ban() {
    fb_write('sals-strawberries/bans/' + getAuth().currentUser.uid, '', true);
    alert("You have been banned. \n" + 
        "You attempted to submit a review which contained potentially malicious tags.\n" + 
        "If you believe that this is a mistake, please appeal to Alex Curwen."
    );
    redirect();
}
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
//checkBan()
export async function checkBan() {
    const READ = await fb_read('sals-strawberries/bans/' + getAuth().currentUser.uid);
    if (READ == null) return;
    if (READ) {
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


//------------------------------------------------------------------------------//
//removeMaliciousText(txt)
export function removeMaliciousText(txt) {
    txt = txt.replaceAll('onerror', '');
    txt = txt.replaceAll('onload', '');
    txt = txt.replaceAll('onchange', '');
    txt = txt.replaceAll('onsubmit', '');
    txt = txt.replaceAll('oninput', '');
    txt = txt.replaceAll('onclick', '');
    txt = txt.replaceAll('script', '');
    txt = txt.replaceAll('<', '');
    txt = txt.replaceAll('>', '');
    return txt;
}
//------------------------------------------------------------------------------//