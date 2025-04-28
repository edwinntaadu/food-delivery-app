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

let server_url = config.API_URL


//Function listeners and pointers
document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("loggedIn_userToken");
     
    if (!token) {
      alert("You are not logged in. Please log in first.");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const response = await fetch(`${server_url}/profile/getProfileInformation`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          },
      });
  
      if (!response.ok) {
          const error = await response.json(); // Read the response body only once
          alert(error.message || "Failed to fetch user profile.");
          return;
      }
  
      const result = await response.json(); // Read the response body only once
  
      // Load Profile information into Page
      document.getElementById("profileDisp_username").textContent = result.profile.username;
      document.getElementById("profileDisp_email").textContent = result.profile.email;
      
  } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("An error occurred while fetching the user profile.");
  }
  });






