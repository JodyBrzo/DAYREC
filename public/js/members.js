//Get the bet made today
function getMembers() {
  getMatchedCSSRules("/api/members")
    .then(response => console.log(response))
    .catch(err => {
      console.log(err);
    });
}

getMembers();
