$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.bet");
  const recordingInput = $("#recording-guess");
  const screenshareInput = $("#screenshare-guess");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const betData = {
      guessRecording: recordingInput.val().trim(),
      guessShare: screenshareInput.val().trim()
    };
    if (!betData.guessRecording || !betData.guessShare) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    placeBet(betData.guessRecording, betData.guessShare);
    recordingInput.val("");
    screenshareInput.val("");
  });
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function placeBet(record, screenshare) {
    $.post("/api/bet", {
      guessRecord: record,
      guessShare: screenshare
    })
      .then(response => {
        window.location.replace("/members");
        // If there's an error, log the error
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
