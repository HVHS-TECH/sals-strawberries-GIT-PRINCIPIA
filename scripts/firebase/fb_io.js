

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
