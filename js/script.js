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
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("register_newUser_btn").addEventListener("click", register_newUser);
});


async function register_newUser() {
    let server_url = config.API_URL

    let username = document.getElementById("signup_username").value;
    let email = document.getElementById("signup_email").value;
    let password = document.getElementById("signup_pass").value;

    const response = await fetch(`${server_url}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username":username, "email":email, "password":password })
    });

    const data = await response.json();
    alert("login-message" +JSON.stringify(data));
}
