
var html_fav_fruits_list = document.getElementById("fav_fruits_list");

//------------------------------------------------------------------------------//
//initAdminData()
function initAdminData() {
    html_fav_fruits_list = document.getElementById("fav_fruits_list");
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
    console.log("KEYS: ");
    console.dir(KEYS);
    for (var k = 0; k < KEYS.length; k++) {
        const USER = VALUE[KEYS[k]];
        emails.push(USER.email);
        favFruits.push(USER.favFruit);
        fruitQnties.push(USER.fruitQnty);
        names.push(USER.name);

        console.log("USER: ");
        console.dir(USER);
    }


    var uniqueFruits = [];
    var uniqueFruitOccurrences = [];

    //Used to find the average favFruitQnty value for each unique fruit
    var uniqueFruitQnties = [];
    

    for (var i = 0; i < favFruits.length; i++) {
        const U_FRUIT_IDX = uniqueFruits.findIndex((value) => {value == favFruits[i];});
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

    console.dir(uniqueFruits);
    console.dir(uniqueFruitQnties);
    console.dir(uniqueFruitOccurrences);

    html_fav_fruits_list.innerHTML = ""; //Reset
    for (var i = 0; i < Math.min(5, combined.length); i++) {
        var aveQuantity = 0;
        for (var j = 0; j < combined[i].allQnties.length; j++) {
            const QNTY = combined[i].allQnties[j];
            aveQuantity += Number(QNTY);
        }
        aveQuantity /= j;

        html_fav_fruits_list.innerHTML += "<p>" + 
        combined[i].fruit + 
        " occurred " + 
        combined[i].numOccurences + 
        " times, with an average desired quantity of " + 
        aveQuantity +
        "</p>";
    }
}
//------------------------------------------------------------------------------//