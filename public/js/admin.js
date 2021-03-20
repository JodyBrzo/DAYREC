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


