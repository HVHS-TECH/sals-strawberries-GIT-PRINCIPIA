import { fb_write, fb_read } from "../firebase/fb_io.mjs";
import {getAuth, setPersistence, browserSessionPersistence} from 'https://cdn.skypack.dev/@firebase/auth';
//------------------------------------------------------------------------------//
//handleSecurity()
export function handleSecurity(txt, doBan) {
    if (typeof txt != 'string') return true;
    const LOWERCASE = txt.toLocaleLowerCase();
    const MIGHT_HAVE_TAG = LOWERCASE.indexOf('<') != -1 && LOWERCASE.indexOf('>') != -1;

    //run when loaded
    const MIGHT_HAVE_ONERROR = LOWERCASE.indexOf('onerror') != -1;
    const MIGHT_HAVE_ONLOAD = LOWERCASE.indexOf('onload') != -1;

    //e.g buttons
    const MIGHT_HAVE_ONCLICK = LOWERCASE.indexOf('onclick') != -1;

    //inputs
    const MIGHT_HAVE_ONCHANGE = LOWERCASE.indexOf('onchange') != -1;
    const MIGHT_HAVE_ONINPUT = LOWERCASE.indexOf('oninput') != -1;
    const MIGHT_HAVE_ONSUBMIT = LOWERCASE.indexOf('onsubmit') != -1;

    //script
    const MIGHT_HAVE_SCRIPT = LOWERCASE.indexOf('script') != -1;


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
        if (doBan) ban();
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
    //window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; //Muahaha
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//removeMaliciousText(txt)
export function removeMaliciousText(txt) {
    if (typeof txt != 'string') return true;
    if (handleSecurity(txt, false)) {return txt;}
    txt = txt.replaceAll('onerror', '');
    txt = txt.replaceAll('ONERROR', '');
    txt = txt.replaceAll('onload', '');
    txt = txt.replaceAll('ONLOAD', '');
    txt = txt.replaceAll('onchange', '');
    txt = txt.replaceAll('ONCHANGE', '');
    txt = txt.replaceAll('onsubmit', '');
    txt = txt.replaceAll('ONSUBMIT', '');
    txt = txt.replaceAll('oninput', '');
    txt = txt.replaceAll('ONINPUT', '');
    txt = txt.replaceAll('onclick', '');
    txt = txt.replaceAll('ONCLICK', '');
    txt = txt.replaceAll('script', '');
    txt = txt.replaceAll('SCRIPT', '');
    txt = txt.replaceAll('<', '');
    txt = txt.replaceAll('>', '');
    return txt;
}
//------------------------------------------------------------------------------//