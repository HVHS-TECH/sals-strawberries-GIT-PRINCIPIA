import {initializeApp} from 'https://cdn.skypack.dev/@firebase/app';
import {getDatabase, ref, get, set, onValue} from 'https://cdn.skypack.dev/@firebase/database';


//Ensure that only one read can happen at a time
//Stores a boolean specifying if the current path can be read (true = yes)
var reads = [];

//------------------------------------------------------------------------------//
//fb_read(path, cb)
    
export async function fb_read(path, cb = ()=>{}) {
    console.log("read(path, cb)\npath = '" + path + "'");

    if (!reads.includes(path)) {
        reads[path] = true
    };
    if (!reads[path]) console.log("read(path, cb) :: waiting for read access");
    while (!reads[path]){}
    console.log("read(path, cb) :: read access gained");
    reads[path] = false;
    if (cb.toString() != (()=>{}).toString()) {
        //The user is handling the data
        get(ref(getDatabase(), path)).then((val)=>{reads[path] = true; cb(val);});
    } else {
        //We must handle (return) the data
        reads[path] = true;
        return (await get(ref(getDatabase(), path))).val(); 
    }
}
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
//fb_write(path, msg)
//path: the path to write to
//key: the key to the message
//msg: the message to write
export async function fb_write(path, key, msg){
    console.log("write(path, msg)\npath = '" + path + "'\nmsg = " + msg);

    //Avoid writing to database root and deleting everything
    if (path == "/") {
        console.error("FB::write(path, msg) :: attempted to write " + msg + " to the database root.");
        console.warn("FB::write(path, msg) :: attempted to write to database root, aborting");
        return;
    }

    if (key == "") {
        //We are just writing a value to a list
        set(ref(getDatabase(), path), msg);
        return;
    } else {
        //We are writing a value with an explicitly defined key
        const JSON_STRING = '{"' + key + '": "' + msg + '"}';
        const JSON_OBJECT = JSON.parse(JSON_STRING);
        
        set(ref(getDatabase(), path + "/" + key), JSON_OBJECT);
    }
    
}
//------------------------------------------------------------------------------//


//One unique listener per path
var listenerPaths = [];
var listenerCBs = [];

//------------------------------------------------------------------------------//
//fb_addWriteListener(path, cb)
export function fb_addWriteListener(path, cb) {
    console.log("fb_addWriteListener(path, cb)\npath = '" + path + "'");

    var isNewPath = false;
    var isNewCb = false;

    if (!listenerPaths.includes(path)) {
        listenerPaths.push(path);
        isNewPath = true;
    }

    //We must use toString to allow for different COPIES (not references) of the same callback code
    if (!listenerCBs.includes(cb.toString())) {
        listenerCBs.push(cb.toString());
        isNewCb = true;
    }
    if (!isNewPath && !isNewCb) {
        //The exact same write listener (same path, same callback) already exists
        console.error("fb_addWriteListener(path, cb) :: there is already a write listener at path '" + path + "' with the callback: " + cb.toString());
        console.warn("fb_addWriteListener(path, cb) :: attempted to add a duplicate write listener, aborting.");
        return;
    }
    
    onValue(ref(getDatabase(), path), cb);
}
//------------------------------------------------------------------------------//