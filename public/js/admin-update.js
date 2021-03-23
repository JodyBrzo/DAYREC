const adminForm = $("form.record-data");
const screenshareMisses = $("input#screenshare-misses");
const recordingMisses = $("input#recording-misses");

adminForm.on("submit", event => {
  event.preventDefault();
  const addData = {
    screenshareMisses: screenshareMisses.val().trim(),
    recordingMisses: recordingMisses.val().trim()
  };

  // If username or password null, or user is not administrator, return
  if (!addData.screenshareMisses || !addData.recordingMisses) {
    return;
  }

  // If we have an email and password we run the loginUser function and clear the form
  recordData(addData.screenshareMisses, addData.recordingMisses);
  screenshareMisses.val("");
  recordingMisses.val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the admin update page
function recordData(screenshareMisses, recordingMisses) {
  $.post("/api/recordlogs", {
    screenshareMisses: screenshareMisses,
    recordingMisses: recordingMisses
  });
  then(() => {
    window.location.replace("/members");
    // If there's an error, log the error
  }).catch(err => {
    console.log(err);
  });
}

// Allow bets checkbox functionality
$("#allow-bets").change(function() {
  fetch("/api/allowBets", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ allowBetStatus: this.checked })
  }).then(response => {});
});
