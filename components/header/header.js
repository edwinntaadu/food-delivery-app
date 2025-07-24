import config from '../../js/store/config.js';
import { renderHomeDefault } from '../home_default/home_default.js';

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
        </div>
      </div>
      <div class="input-group mt-3 bg-white rounded-pill shadow-sm overflow-hidden">
        <span class="input-group-text bg-white border-0 ps-3"><i class="mdi mdi-magnify fs-4"></i></span>
        <input id="home-search-box" type="text" class="form-control border-0 px-2 py-3" placeholder="Search">
      </div>
    </div>
  `;
}

/* (function ($) {
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

})(jQuery); */

let server_url = config.API_URL;
let district_city = "Uknown District"; // Default value

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
       window.location.href = './login.html'; // Redirect to sign-in page
      //alert(error.message || "Failed to fetch user profile.");
      return;
    }

    const result = await response.json();
    //console.log("First address object:", result.profile.addresses[0]);

    if (result.profile.addresses && result.profile.addresses.length > 0) {
      district_city = result.profile.addresses[0].district+", "+result.profile.addresses[0].city;
    } else {
      console.error("Addresses array is undefined or empty.");
      district_city = "Default Location"; // Fallback value
    }

    // Generic card renderers (hoisted)
function createFoodCard(item) {
  return `
    <div class="card rounded-4 border-0 shadow-sm osahan-card">
        <div class="card-body d-flex flex-column">
            <span class="material-symbols-outlined ms-auto">${item.isFavorite ? 'favorite' : 'favorite_border'}</span>
            <img class="img-fluid mb-3" src="${item.image}" alt="${item.name}">
            <div class="d-flex">
                <span class="badge rounded-pill ${item.badgeClass}">${item.category}</span>
            </div>
            <h5 class="mb-0 mt-2 fw-bold">${item.name}</h5>
            <div class="d-flex gap-2 align-items-center mb-2">
                <p class="text-secondary opacity-75 mb-0 miny-text">${item.deliveryTime}min</p>
                <p class="text-primary opacity-75 mb-0 miny-text">
                <span class="mdi mdi-star text-primary"></span> ${item.rating}</p>
            </div>
            <div class="d-flex align-items-center">
                <h4 class="mb-0">$${item.price}</h4>
                <a href="add-to-cart.html" class="text-decoration-none bg-dark rounded-pill p-1 d-flex align-items-center justify-content-center ms-auto">
                <span class="material-symbols-outlined text-white">add</span></a>
            </div>
        </div>
        <a href="add-to-cart-2.html" class="stretched-link"></a>
    </div>
  `;
}

function createRestaurantCard(restaurant) {
  return `
    <div class="card mb-3 rounded-4 border-0 shadow overflow-hidden osahan-card-2">
      <img src="${restaurant.image}" class="card-img-top img-fluid" alt="${restaurant.name}">
      <div class="card-body">
        <div class="d-flex">
          <span class="badge rounded-pill bg-info-subtle pt-1 text-info">${restaurant.cuisine}</span>
        </div>
        <h5 class="mb-0 h6 fw-bold pt-1">${restaurant.name}</h5>
        <div class="d-flex gap-2 align-items-center">
          <p class="text-secondary opacity-75 mb-0">${restaurant.deliveryTime}min</p>
          <p class="text-primary opacity-75 mb-0">
            <span class="mdi mdi-star text-primary"></span> ${restaurant.rating}
          </p>
          <button class="btn btn-primary rounded-circle p-1 ms-auto bookmark-btn" data-id="${restaurant.id}">
            <span class="material-symbols-outlined text-white">bookmark</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

    document.getElementById("header-container").innerHTML = renderHeader();

    // Attach event listener to the dynamically created search box
    const searchInput = document.getElementById("home-search-box");
    if (searchInput) {
      searchInput.addEventListener("input", async function () {
        const searchTerm = searchInput.value;
        const dynamicBodyContainer = document.getElementById("dynamic-body-container");
        if (searchTerm.length > 0) {
            if (dynamicBodyContainer) {
                try {
                    const url_1 = new URL(`${server_url}/meals/search`);
                    url_1.searchParams.append("query", searchTerm);

                    const url_2 = new URL(`${server_url}/sellers/search`);
                    url_2.searchParams.append("query", searchTerm);

                    // Fetch both responses in parallel
                    const [response_1, response_2] = await Promise.all([
                        fetch(url_1, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            },
                        }),
                        fetch(url_2, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            },
                        }),
                    ]);

                    // Check if both responses are OK
                    if (!response_1.ok || !response_2.ok) {
                        const error_1 = !response_1.ok ? await response_1.json() : null;
                        const error_2 = !response_2.ok ? await response_2.json() : null;
                        console.error("Error fetching data:", error_1 || error_2);
                        alert("Failed to fetch search results.");
                        return;
                    }

                    // Parse both responses as JSON
                    const result_1 = await response_1.json();
                    const result_2 = await response_2.json();

                    // Combine the results into a single array
                    const combinedResults = [...result_1, ...result_2];

                    console.log("Combined Search Results:", combinedResults);

                    // Render the combined results dynamically
                    if (combinedResults.length > 0) {
                        const foodCards = combinedResults.map(item => {
                            if (item.category) {
                                // Render food card
                                return createFoodCard(item);
                            } else {
                                // Render restaurant card
                                return createRestaurantCard(item);
                            }
                        }).join('');
                        dynamicBodyContainer.innerHTML = foodCards;
                    } else {
                        dynamicBodyContainer.innerHTML = `
                            <div class="text-center py-5">
                                <h5 class="text-danger">No results found</h5>
                            </div>
                        `;
                    }
                } catch (error) {
                    console.error("Could not search data:", error);
                    alert("An error occurred while fetching the search results.");
                }
            } else {
                console.error("Element with id 'dynamic-body-container' not found in the DOM.");
            }
        } else {
            if (dynamicBodyContainer) {
                // Replace the content with default home content
                dynamicBodyContainer.innerHTML = renderHomeDefault();
            } else {
                console.error("Element with id 'dynamic-body-container' not found in the DOM.");
            }
        }
    });
    } else {
      console.error("Search input not found.");
    }


  } catch (error) {
    console.error("Error fetching user profile:", error);
    district_city = "Default Location"; // Fallback value

    document.getElementById("header-container").innerHTML = renderHeader();
  window.location.href = "login.html"; // Redirect to login page
  }
});




