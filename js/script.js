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
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sendPhone_btn").addEventListener("click", verifyPhone);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("verify_code_btn").addEventListener("click", submitPhoneVerificationCode);
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("send_verification_code_again_btn").addEventListener("click", verifyPhone);
});

document.addEventListener("DOMContentLoaded", function () {
        let newUsers_phone = localStorage.getItem("reg_phone");
        document.getElementById("displayPhone").innerText = `+49 ${newUsers_phone}`;
        console.log(temp_phone)    
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("displayPhone").textContent = phoneNumber;
});

document.addEventListener("DOMContentLoaded", () => {
    const iconElement = document.getElementById("reset_account_detail_icon");
    const inputElement = document.getElementById("reset_account_detail_input");
    const nextButton = document.getElementById("proceed_with_selected_pass_reset_btn");

    iconElement.addEventListener("click", () => {
        const icon = iconElement.querySelector("i");

        if (icon.classList.contains("mdi-email-outline")) {
            icon.classList.remove("mdi-email-outline");
            icon.classList.add("mdi-phone-outline");
            inputElement.placeholder = "Account Phone";
        } else {
            icon.classList.remove("mdi-phone-outline");
            icon.classList.add("mdi-email-outline");
            inputElement.placeholder = "Account Email";
        }
    });

    nextButton.addEventListener("click", () => {
        const inputValue = inputElement.value.trim();
        const icon = iconElement.querySelector("i");

        if (icon.classList.contains("mdi-email-outline")) {
            // Validate email
            if (validateEmail(inputValue)) {
                localStorage.setItem("userContact", inputValue);
                window.location.href = './verify-email.html';
            } else {
                alert("Please enter a valid email address.");
            }
        } else if (icon.classList.contains("mdi-phone-outline")) {
            // Validate phone number
            if (validatePhoneNumber(inputValue)) {
                localStorage.setItem("userContact", inputValue);
                window.location.href = './verify.html';
            } else {
                alert("Please enter a valid phone number.");
            }
        }
    });
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhoneNumber(phone) {
        const re = /^\+?[1-9]\d{1,14}$/; // Basic international phone number validation
        return re.test(phone);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const displayEmailElement = document.getElementById("request-email-formatted");

    // Retrieve the stored contact from localStorage
    const userContact = localStorage.getItem("userContact");

    if (userContact) {
        displayEmailElement.textContent = formatEmail(userContact);
        console.log("Email  : ", userContact);
    }

    function formatEmail(email) {
        const firstPart = email.slice(0, 3);
        const lastPart = email.slice(-9);
        return `${firstPart}---${lastPart}`;
    }
});

let checkedId = "";
let uncheckedIds = [];
document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll("input[name='btnradio']");

    function getCheckedAndUncheckedIds() {
        

        radioButtons.forEach((radio) => {
            if (radio.checked) {
                checkedId = radio.id;
            } else {
                uncheckedIds.push(radio.id);
            }
        });

        console.log("Checked ID:", checkedId);
        console.log("Unchecked IDs:", uncheckedIds);
    }

    // Listen for changes in radio buttons
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", getCheckedAndUncheckedIds);
    });

    // Initial check on page load
    getCheckedAndUncheckedIds();
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("proceed_with_selected_pass_reset_btn").addEventListener("click", send_password_reset_code);
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login_button").addEventListener("click", login);
});

let server_url = config.API_URL


async function send_password_reset_code() {
    if (checkedId === "btnradio1") {
        // Handle phone entry
        const phone = document.getElementById("reset_account_detail_input").value.trim();

        if (validatePhoneNumber(phone)) {
            try {
                const response = await fetch(`${server_url}/user/phone_verification_reset-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "phone": phone })
                });

                const res = await response.json();
                if (res.code === 100) { 
                    alert("Verification code sent to your phone.");
                    alert("Verification code sent to your email.", res.message); //TBD Remove this line
                    localStorage.setItem("message", res.message); //TBD Remove this line
                    localStorage.setItem("userContact", phone);
                    //window.location.href = './verify.html';
                } else {
                    alert("Failed to send verification code. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while sending the verification code. Please try again.");
            }
        } else {
            alert("Please enter a valid phone number.");
        }
    } else if (checkedId === "btnradio2") {
        // Handle email entry
        const email = document.getElementById("reset_account_detail_input").value.trim();

        if (validateEmail(email)) {
            try {
                const response = await fetch(`${server_url}/user/email_verification_reset-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email": email })
                });

                const res = await response.json();
                if (res.code === 100) { // Assuming 100 indicates success
                    alert("Verification code sent to your email.");
                    alert("Verification code sent to your email.", res.message); //TBD Remove this line
                    localStorage.setItem("userContact", email);
                    localStorage.setItem("message", res.message); //TBD Remove this line
                    //window.location.href = './verify-email.html';
                } else {
                    alert("Failed to send verification code. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while sending the verification code. Please try again.");
            }
        } else {
            alert("Please enter a valid email address.");
        }
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhoneNumber(phone) {
    const re = /^\+?[1-9]\d{1,14}$/; // Basic international phone number validation
    return re.test(phone);
}

async function register_newUser() {
    
    let username = document.getElementById("signup_username").value;
    let email = document.getElementById("signup_email").value;
    let password = document.getElementById("signup_pass").value;

    const response = await fetch(`${server_url}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username":username, "email":email, "password":password })
    });

    const res = await response.json();
    if(res.user && res.user.email == email && res.userProfile.username == username){
       alert("Kaish "+username+ " your account is almost ready.") 
       localStorage.setItem("reg_id", res.userProfile._id);
       window.location.href = './verifiction.html';
    }else{
        if(!res.user){
            alert("fe[err_100]: failed to create account")
        }
        if(res.user && !res.userProfile.username){
            alert("fe[info_100]: failed to intiialize profile. You can do this later")
        }
    }
    alert(JSON.stringify(data.user.email));
}

async function verifyPhone() {
    let phone = document.getElementById("verification_phone_signup").value;
    function isValidPhoneNumber(phone) {
        const phoneRegex = /^\+?\d{7,15}$/; // Supports optional '+' and 7-15 digits
        return true//phoneRegex.test(phone);
    }
    
    if(isValidPhoneNumber(phone)){
        const response = await fetch(`${server_url}/user/send-code_to_phone`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "phone":phone })
        });

        localStorage.setItem("reg_phone", phone);
        const res = await response.json();

        if(res.code ==100){
            alert(JSON.stringify(res.message))
            window.location.href = './verify.html';
        }else{
            alert("failed to save verification code")
        }
    }else{
        alert("Invalid Phone number")
    }
}

async function submitPhoneVerificationCode() {
    let code_digit_1 = document.getElementById("verCode_1").value;
    let code_digit_2 = document.getElementById("verCode_2").value;
    let code_digit_3 = document.getElementById("verCode_3").value;
    let code_digit_4 = document.getElementById("verCode_4").value;

    let full_code = code_digit_1+code_digit_2+code_digit_3+code_digit_4

    let newUsers_phone = localStorage.getItem("reg_phone");
    let newUser_id = localStorage.getItem("reg_id");

    try{
        const response = await fetch(`${server_url}/user/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "phone":newUsers_phone, "code": full_code })
    });

    const res = await response.json();
    console.log(JSON.stringify(res))
    console.log(newUser_id)   

    if (res.code === 100) { // Assuming `res.success` indicates successful verification
        alert("Verification successful! Redirecting to sign-in page...");
        window.location.href = './login.html'; // Redirect to sign-in page
    } else {
        alert("Verification failed. Please try again.");
        clearInputFields(); // Clear all input fields
    }
} catch (error) {
    console.error("Error during verification:", error);
    alert("An error occurred during verification. Please try again.");
    clearInputFields(); // Clear all input fields
}

}

// Helper function to clear all input fields
function clearInputFields() {
    document.getElementById("verCode_1").value = "";
    document.getElementById("verCode_2").value = "";
    document.getElementById("verCode_3").value = "";
    document.getElementById("verCode_4").value = "";
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


