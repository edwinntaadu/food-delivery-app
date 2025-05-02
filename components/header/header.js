import config from '../../js/store/config.js';

export function renderHeader() {
  return `
    <div class="osahan-page-header mb-auto p-3">
      <div class="d-flex align-items-center justify-content-between">
        <a href="add-to-address.html" class="d-flex align-items-center text-decoration-none me-auto gap-1">
          <i class="mdi mdi-map-marker-circle h2 m-0 text-muted"></i>
          <div class="ms-2 lh-1">
            <h6 class="text-primary mb-0 fw-bold">Location</h6>
            <small class="Online text-secondary opacity-75 mb-0">${district_city}</small>
          </div>
        </a>
        <div class="d-flex align-items-center gap-2">
          <a href="profile.html"><img class="img-fluid avtar-sm rounded-pill bg-white shadow-sm p-1" src="img/user/1.jpeg"></a>
          <a href="notification.html" class="icon-sm shadow-sm"><span class="mdi mdi-bell-outline mdi-18px"></span></a>
          <a href="#" class="toggle d-flex align-items-center justify-content-center bg-white shadow-sm icon-sm fs-5 hc-nav-trigger hc-nav-1" role="button" aria-controls="hc-nav-1"><i class="bi bi-list mdi-18px"></i></a>
        </div>
      </div>
      <div class="input-group mt-3 bg-white rounded-pill shadow-sm overflow-hidden">
        <span class="input-group-text bg-white border-0 ps-3"><i class="mdi mdi-magnify fs-4"></i></span>
        <input type="text" class="form-control border-0 px-2 py-3" placeholder="Search">
      </div>
    </div>
  `;
}

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

let server_url = config.API_URL;
let district_city = "California, USA2"; // Default value

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

    if (response.status !== 200) {
      const error = await response.json();
      alert(error.message || "Failed to fetch user profile.");
      return;
    }

    const result = await response.json();
    console.log("First address object:", result.profile.addresses[0]);

    if (result.profile.addresses && result.profile.addresses.length > 0) {
      district_city = result.profile.addresses[0].district+", "+result.profile.addresses[0].city;
    } else {
      console.error("Addresses array is undefined or empty.");
      district_city = "Default Location"; // Fallback value
    }

    document.getElementById("header-container").innerHTML = renderHeader();

  } catch (error) {
    console.error("Error fetching user profile:", error);
    district_city = "Default Location"; // Fallback value
    document.getElementById("header-container").innerHTML = renderHeader();
  }
});