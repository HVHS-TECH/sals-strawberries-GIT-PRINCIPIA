

//------------------------------------------------------------------------------//
//fb_write(path, msg)
//path: the path to write to
//key: the key to the message
//msg: the message to write
async function fb_write(path, key, msg) {
    console.log("fb_write(path, msg)\npath = '" + path + "'\nmsg = " + msg);

    //Avoid writing to database root and deleting everything
    if (path == "/") {
        console.error("fb_write(path, msg) :: attempted to write " + msg + " to the database root.");
        console.warn("fb_write(path, msg) :: attempted to write to database root, aborting");
        return;
    }

    if (key == "") {
        //We are just writing a value to a list
        firebase.database().ref(path).set(msg);
        return;
    } else {
        //We are writing a value with an explicitly defined key
        const JSON_STRING = '{"' + key + '": "' + msg + '"}';
        const JSON_OBJECT = JSON.parse(JSON_STRING);
        
        firebase.database().ref(path + "/" + key).set(JSON_OBJECT);
    }
    
}
//------------------------------------------------------------------------------//


//One unique listener per path
var listenerPaths = [];
var listenerCBs = [];

//------------------------------------------------------------------------------//
//fb_addWriteListener(path, cb)
function fb_addWriteListener(path, cb) {
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
    
    firebase.database().ref(path).on('value', cb);
}
//------------------------------------------------------------------------------//