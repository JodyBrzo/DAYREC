// After login, redirect to admin-update
// Update button adds data to database and updates actual today on members page
// route for logout takes you back to login page

// Getting references to our form and inputs
const loginForm = $("form.admin-login");
const emailInput = $("input#email-input");
const passwordInput = $("input#password-input");

// When the form is submitted, we validate there's an email and password entered
loginForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
    };

    // If username or password null, or user is not administrator, return
    if (!userData.email || !userData.password || !userData.isAdmin) {
        return;
    }    

    // If we have an email and password we run the loginUser function and clear the form
    loginAdmin(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the admin update page
function loginAdmin(email, password) {
    $.post("/api/login", {
        email: email,
        password: password
    });
        .then(function () {
            window.location.replace("/admin-update");
            // If there's an error, log the error
        })
        .catch(function (err) {
            console.log(err);
        });
}


<<<<<<< HEAD
// route for logout takes you back to login page






$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
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
=======
>>>>>>> a6c80395aaf34ba1087924958133daf6d07a1225
