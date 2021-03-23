$(document).ready(() => {
    $.get("/api/todaysUserBet")
    .then(userBet => {})
    .catch(err => {
      console.log(err);
    });
//   // This file just does a GET request to figure out which user is logged in
//   // and updates the HTML on the page
//   $.get("/api/user_data").then(data => {
//     $(".member-name").text(data.email);
//   });
});

const { response } = require("express");

//Get bet made today
function getUserBetToday() {
  const userID = window.user.id;
  $.get(`/api/bet?userId=${userID}`)
    .then(userBet => {})
    .catch(err => {
      console.log(err);
    });
}

//Get bet made today
function getUserBetToday() {
  const userID = window.user.id;
  fetch(`/api/bet?userId=${userID}`)
    .then((userID) => response.json())
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
}

getUserBetToday();

//Get historical bets from user
function getUserBetsAll() {
  const userID = window.user.id;
  $.get(`/api/bets?userId=${userID}`)
    .then(userWithBets => {})
    .catch(err => {
      console.log(err);
    });
}
