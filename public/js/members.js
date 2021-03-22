// $(document).ready(() => {
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(data => {
//     $(".member-name").text(data.email);
//   });
// });

//routes for pages

//place bet buttons takes you to place bet route

//Get bet made today
function getUserBetToday() {
  const userID = window.user.id;
  $.get(`/api/bet?userId=${userID}`)
    .then(userBet => {})
    .catch(err => {
      console.log(err);
    });
}

//Get historical bets from user
function getUserBetsAll() {
  const userID = window.user.id;
  $.get(`/api/bets?userId=${userID}`)
    .then(userWithBets => {})
    .catch(err => {
      console.log(err);
    });
}
