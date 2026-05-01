var html_name = document.getElementById("name");
var html_fav_fruit = document.getElementById("favouriteFruit");
var html_fruit_qnty = document.getElementById("fruitQuantity");

var init = false;



//------------------------------------------------------------------------------//
//submit()
function submit() {
    var formdata = getFormData();
    fb_write("sals-strawberries/formdata/" + username + "/email", '', email);
    fb_write("sals-strawberries/formdata/" + username + "/name", '', formdata.name);
    fb_write("sals-strawberries/formdata/" + username + "/favFruit", '', formdata.favFruit);
    fb_write("sals-strawberries/formdata/" + username + "/fruitQnty", '', formdata.fruitQnty);
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