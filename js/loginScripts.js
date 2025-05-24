import config from './store/config.js';

(function ($) {
    "use strict"; // Start of use strict

    // Sidebar
    var $main_nav = $('#main-nav');
    var $toggle = $('.toggle');

    var defaultOptions = {
        disableAt: false,
        customToggle: $toggle,
        levelSpacing: 40,
        navTitle: '',
        levelTitles: true,
        levelTitleAsBack: true,
        pushContent: '#container',
        insertClose: 2
    };
    var Nav = $main_nav.hcOffcanvasNav(defaultOptions);

})(jQuery);


//Function listeners and pointers


//Do Facebook and Google login here


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("proceed_with_selected_pass_reset_btn").addEventListener("click", send_password_reset_code);
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login_button").addEventListener("click", login);
});

let server_url = config.API_URL




function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


async function login() {
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_pass").value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    try{
    const response = await fetch(`${server_url}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "email":email, "password":password })
    });

    const res = await response.json();
    console.log(JSON.stringify(res))
    if (res.token) {
        // Save user data to localStorage if needed
        console.log(res.token)
        localStorage.setItem("loggedIn_userToken", res.token);
        localStorage.setItem("userEmail", email);
        // Redirect to home.html
        window.location.href = "home.html";
    } else {
        alert(res.message || "Login failed. Please try again.");
    }}catch (error) {
        console.error("Error during login:", error);
            alert("An error occurred. Please try again later.");
    }
}


    