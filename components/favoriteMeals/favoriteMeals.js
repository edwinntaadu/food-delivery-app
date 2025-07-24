import config from '../../js/store/config.js';

    let server_url = config.API_URL
    const token = localStorage.getItem("loggedIn_userToken");

    window.remove_from_favorites = async function(foodID) {

                try {
                    const response = await fetch(`${server_url}/fav/remove`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({ "foodId": foodID })
                    });

                        
                    if (!response.ok) {
                        const error = await response.json(); // Read the response body only once
                        alert(error.message || "Failed to remove food from favorite.");
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

export async function renderFavoriteMeals() {

      if (!token) {
         window.location.href = "login.html";
         return;
      }

       try {
        // Fetch data from the API
        const response = await fetch(`${server_url}/fav/`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          }
          
      });
      // Replace with your actual API URL
        if (!response.ok) {
            throw new Error('Failed to fetch bookmarked foods');
        }

        const favoriteMeals = await response.json(); // Assuming the API returns an array of food objects
        console.log("favoriteMeals", favoriteMeals.foodID)

        //use favoriteMeals to fetch actual food details
        const foodDetailsPromises = favoriteMeals.map(async (fav) => {
            if (!fav.foodId) {
                throw new Error('Missing foodId in favorite');
            }
            //console.log("fav.foodId", fav.foodId._id);
            const foodResponse = await fetch(`${server_url}/meals/findby_id/${fav.foodId._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                
            });

            if (!foodResponse.ok) {
                throw new Error('Failed to fetch food details');
            }

            const foodDetails = await foodResponse.json();
            return {
                ...foodDetails,
                isFavorite: true
            };
        });
        
        const favoriteFoods = await Promise.all(foodDetailsPromises);
        console.log("favorite foods", favoriteFoods);

        // Generate the slider content with meal cards
        const sliderContent = favoriteFoods.map(meal => `
            <div class="col-6">
                <div class="card rounded-4 border-0 shadow-sm osahan-card">
                <div class="card-body d-flex flex-column">
                    <span onclick="remove_from_favorites('${meal._id}')" class="material-symbols-outlined ms-auto">favorite</span>
                    <img class="img-fluid mb-3" src="${meal.imageUrl || 'img/list/default.jpg'}" alt="${meal.name}">
                    <div class="d-flex">
                    <span class="badge rounded-pill bg-info-subtle pt-1 text-info">${meal.category || ''}</span>
                    </div>
                    <h5 class="mb-0 mt-2 fw-bold">${meal.name}</h5>
                    <div class="d-flex gap-2 align-items-center mb-2">
                    <p class="text-secondary opacity-75 mb-0 miny-text">${meal.preparationTime || ''}min</p>
                    <p class="text-primary opacity-75 mb-0 miny-text"><span class="mdi mdi-star text-primary"></span> ${meal.general_rating || ''}</p>
                    </div>
                    <div class="d-flex align-items-center">
                    <h4 class="mb-0">$${meal.price} <span class="text-secondary fs-6 mb-0 fw-normal text-decoration-line-through">$${meal.oldPrice || ''}</span></h4>
                    <a href="add-to-cart.html" class="text-decoration-none bg-dark rounded-pill p-1 d-flex align-items-center justify-content-center ms-auto">
                        <span class="material-symbols-outlined text-white">add</span>
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
    } catch (error) {
        console.error("Error fetching favorite meals:", error);
        return `<div class="text-danger">Failed to load meals.</div>`;
    }

}