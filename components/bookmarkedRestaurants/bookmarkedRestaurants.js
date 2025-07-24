import config from '../../js/store/config.js';

    let server_url = config.API_URL
    const token = localStorage.getItem("loggedIn_userToken");

    window.remove_from_bookmarks = async function(restaurantID) {

                try {
                    const response = await fetch(`${server_url}/restBookmark/remove`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({ "restaurantId": restaurantID })
                    });

                        
                    if (!response.ok) {
                        const error = await response.json(); // Read the response body only once
                          alert(error.message || "Failed to remove restaurant from favorite.");
                        return;
                    }
                
                    const result = await response.json(); // Read the response body only once

                    const container = document.getElementById('fav_bookmark_list-container');
                    if (container) {
                        container.innerHTML = await renderFavoriteMeals();
                    }
                    
                } catch (error) {
                    console.error("Error removing from favs:", error);
                    alert("An error occurred while removing food from favorites.");
                }
    };

export async function renderBookmarkedRestaurants() {

      if (!token) {
         window.location.href = "login.html";
         return;
      }

       try {
        // Fetch data from the API
        const response = await fetch(`${server_url}/restBookmark/`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          }
      });
      // Replace with your actual API URL
        if (!response.ok) {
            throw new Error('Failed to fetch bookmarked restaurants');
        }

        const bookMarkedRestaurants = await response.json(); // Assuming the API returns an array of food objects
        console.log("bookmarkedRestaurants", bookMarkedRestaurants.restaurantId)

        //use favoriteMeals to fetch actual food details
        const restDetailsPromises = bookMarkedRestaurants.map(async (bkmked) => {
            if (!bkmked.restaurantId) {
                throw new Error('Missing RestaurantID in bookmarks');
            }
            //console.log("fav.foodId", fav.foodId._id);
            const restResponse = await fetch(`${server_url}/restBookmark/findby_id/${bkmked.restaurantId._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                
            });

            console.log("restaurant result from server:", restResponse)
            if (!restResponse.ok) {

                throw new Error('Failed to fetch Restaurants details');
            }

            const restaurantDetails = await restResponse.json();
            return {
                ...restaurantDetails,
                isbookmarked: true
            };
        });
        
        const bookedMarkedRestaurants = await Promise.all(restDetailsPromises);
        console.log("booked rests", bookedMarkedRestaurants);

        // Generate the slider content with meal cards
        const sliderContent = bookedMarkedRestaurants.map(rest => `
        <div class="col-6">
            <div class="card rounded-4 border-0 shadow-sm osahan-card">
            <div class="card-body d-flex flex-column">
                <span onclick="remove_from_bookmarks('${rest._id}')" class="material-symbols-outlined ms-auto">favorite</span>
                <img class="img-fluid mb-3" src="${rest.imageUrl || 'img/list/default-restaurant.jpg'}" alt="${rest.name}">
                <div class="d-flex">
                <span class="badge rounded-pill bg-info-subtle pt-1 text-info">${rest.category || ''}</span>
                </div>
                <h5 class="mb-0 mt-2 fw-bold">${rest.name}</h5>
                <div class="d-flex gap-2 align-items-center mb-2">
                <p class="text-secondary opacity-75 mb-0 miny-text">${rest.address?.city || ''}, ${rest.address?.state || ''}</p>
                <p class="text-primary opacity-75 mb-0 miny-text"><span class="mdi mdi-star text-primary"></span> ${rest.general_rating || ''}</p>
                </div>
                <div class="d-flex align-items-center">
                <p class="mb-0">${rest.phone || ''}</p>
                <a href="restaurant-details.html?id=${rest._id}" class="text-decoration-none bg-dark rounded-pill p-1 d-flex align-items-center justify-content-center ms-auto">
                    <span class="material-symbols-outlined text-white">info</span>
                </a>
                </div>
            </div>
            </div>
        </div>
        `).join('');
        return `
        <div class="row g-3">
            ${sliderContent}
        </div>
        `;
        // ...existing code...
    } catch (error) {
        console.error("Error fetching booked Restaurant 2 2 :", error);
        return `<div class="text-danger">Failed to load restaurants.</div>`;
    }

} 