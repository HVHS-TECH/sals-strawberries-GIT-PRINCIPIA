var html_name = document.getElementById("name");
var html_fav_fruit = document.getElementById("favouriteFruit");
var html_fruit_qnty = document.getElementById("fruitQuantity");

var init = false;



//------------------------------------------------------------------------------//
//submit()
//submit the form data
function submit() {
    var formdata = getFormData();
    if (uid == null) return;
    if (email == null || formdata.name == "" || formdata.favFruit == "" || formdata.fruitQnty == "") return;
    fb_write("sals-strawberries/formdata/" + uid + "/email", '', email);
    fb_write("sals-strawberries/formdata/" + uid + "/name", '', formdata.name);
    fb_write("sals-strawberries/formdata/" + uid + "/favFruit", '', formdata.favFruit);
    fb_write("sals-strawberries/formdata/" + uid + "/fruitQnty", '', formdata.fruitQnty);

    var html_thanks_for_answering = document.getElementById("thanks_for_answering");
    var html_delete_on_submit = document.getElementById("delete_on_submit");
    var html_recipient = document.getElementById("recipient");

    html_delete_on_submit.remove();

    html_thanks_for_answering.style.display = "block";
    
    html_recipient.innerHTML = "To: <i>" + email + "</i> ( " + formdata.name + " )";
}
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//getFormData()
function getFormData() {
    console.log("getFormData()");
    var formdata = {name: "", favFruit: "", fruitQnty: 0};
    html_name = document.getElementById("name");
    html_fav_fruit = document.getElementById("favouriteFruit");
    html_fruit_qnty = document.getElementById("fruitQuantity");
    formdata.name = html_name.value;
    formdata.favFruit = html_fav_fruit.value;
    formdata.fruitQnty = html_fruit_qnty.value;
    return formdata;
}
//------------------------------------------------------------------------------//