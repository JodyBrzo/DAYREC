$(document).ready(() => {
  // Getting references to our form and input
  console.log("Nailed it")
  const signUpForm = $("#sign-up-form");
  const emailInput = $("#user-email");
  const passwordInput = $("#user-password");
  const studentName = $("#user-name");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    console.log("here!");
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      studentName: studentName.val().trim()
    };
  console.log(userData);
    if (!userData.email || !userData.password || !userData.studentName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.studentName);
    emailInput.val("");
    passwordInput.val("");
    studentName.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, studentName) {
    console.log("farther still")
    $.post("/api/signup", {
      email: email,
      password: password,
      studentName: studentName
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
