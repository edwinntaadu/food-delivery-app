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

let server_url = config.API_URL


function send_password_reset_code() {
    console.log("Moving", checkedId);
    if(checkedId==="btnradio1"){
        //generate and send code to phone

        window.location.href = './verify.html';
    }   
    if(checkedId==="btnradio2"){
        //generate and send code to email
        
        window.location.href = './verify-email.html';
    } 
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

    const response = await fetch(`${server_url}/user/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "phone":newUsers_phone, "code": full_code, "id": newUser_id })
    });

    const res = await response.json();
    console.log(JSON.stringify(res))
    /* if(res.code){
        alert(JSON.stringify(res.message))
        window.location.href = './verify.html';
    }else{
        alert("failed to create verification code")
    } */
}


