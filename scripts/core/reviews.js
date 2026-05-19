//------------------------------------------------------------------------------//
//submitReview()
function submitReview() {
    var html_review = document.getElementById("review");
    var review = html_review.value;
    const MAX_LENGTH = 500;
    if (handleSecurity(review)) {
        fb_write("sals-strawberries/reviews/" + firebase.auth().currentUser.uid + "/review", '', review.slice(0, MAX_LENGTH));
        fb_write("sals-strawberries/reviews/" + firebase.auth().currentUser.uid + "/name", '', firebase.auth().currentUser.displayName);
    }
    

    
}
//------------------------------------------------------------------------------//



//------------------------------------------------------------------------------//
//updateReviewsList()
async function updateReviewsList() {
    var html_reviews = document.getElementById("reviews");
    var reviews = await fb_read('sals-strawberries/reviews/');

    const KEYS = Object.keys(reviews);
    //Reset reviews list
    html_reviews.innerHTML = "";

    for (var i = 0; i < KEYS.length; i++) {
        const VAL = reviews[KEYS[i]];
        const NAME = VAL.name;
        const REVIEW = VAL.review;
        html_reviews.innerHTML += "<h3>" + NAME + " says: </h3>";
        html_reviews.innerHTML += "<p>" + REVIEW + "</p>";
    }
}
//------------------------------------------------------------------------------//