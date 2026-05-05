
var html_fav_fruits_list = document.getElementById("fav_fruits_list");

//------------------------------------------------------------------------------//
//initAdminData()
function initAdminData() {
    fb_addWriteListener("sals-strawberries/formdata/", updateAdminData);
}
//------------------------------------------------------------------------------//\


//------------------------------------------------------------------------------//
//updateAdminData()
function updateAdminData(read) {
    const VALUE = read.val();

    if (VALUE == null) return;
    
    var emails = [];
    var favFruits = [];
    var fruitQnties = [];
    var names = [];
    const KEYS = Object.keys(VALUE);

    for (var k = 0; k < KEYS.length; k++) {
        const USER = VALUE[KEYS[k]];
        emails.push(USER.email);
        favFruits.push(USER.favFruit);
        fruitQnties.push(USER.fruitQnty);
        names.push(USER.name);
    }

    var uniqueFruits = [];
    var uniqueFruitOccurrences = [];

    //Used to find the average favFruitQnty value for each unique fruit
    var uniqueFruitQnties = [];
    

    for (var i = 0; i < favFruits.length; i++) {
        const U_FRUIT_IDX = uniqueFruits.findIndex(favFruits[i]);
        if (U_FRUIT_IDX != -1) {
            uniqueFruitOccurrences[U_FRUIT_IDX] ++;
            uniqueFruitQnties[U_FRUIT_IDX].push(fruitQnties[i]);
        } else {
            uniqueFruits.push(favFruits[i]);
            uniqueFruitOccurrences.push(1);
            uniqueFruitQnties.push([fruitQnties[i]]);
        }
    }


    //Find top 5 fruits
    var combined = uniqueFruits.map((value, index) => {return {fruit: value, numOccurences: uniqueFruitOccurrences[index], allQnties: uniqueFruitQnties[index]};});

    combined.sort((a, b) => {return a.numOccurences - b.numOccurences;});


    for (var i = 0; i < 5; i++) {
        html_fav_fruits_list.innerHTML += "<p>" + combined[i].fruit + "</p>";
    }
}
//------------------------------------------------------------------------------//