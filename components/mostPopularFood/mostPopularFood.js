import config from '../../js/store/config.js';

    let server_url = config.API_URL
    const token = localStorage.getItem("loggedIn_userToken");

    window.addRemove_to_favorites = async function(foodID, isFav, el) {

        if (!el) return; // Safety check
    
        switch (isFav) {
            case true:
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

                    

                     // Update style immediately
/*                     el.style.backgroundColor = "#878787";  //
                    el.style.color = "#fff"; */
                    //el.setAttribute("onclick", `addRemove_to_favorites('${foodID}', false, this)`);
                    const container = document.getElementById('most-popular-food-slider')?.parentNode;
                    if (container) {
                        container.innerHTML = await renderMostPopularFood();
                    }
                    
                } catch (error) {
                    console.error("Error removing from favs:", error);
                    alert("An error occurred while removing food from favorites.");
                }
                break;
            case false:
                try {
                    const response = await fetch(`${server_url}/fav/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({ "foodId": foodID })
                    });

                        
                    if (!response.ok) {
                        const error = await response.json(); // Read the response body only once
                        alert(error.message || "Failed to add food to favorite.");
                        return;
                    }
                
                    const result = await response.json(); // Read the response body only once

                    // Update style immediately
/*                     el.style.backgroundColor = "#e91e63";
                    el.style.color = "#fff"; */
                    //el.setAttribute("onclick", `addRemove_to_favorites('${foodID}', true, this)`);
                    const container = document.getElementById('most-popular-food-slider')?.parentNode;
                    if (container) {
                        container.innerHTML = await renderMostPopularFood();
                    }

                } catch (error) {
                    console.error("Error adding to favs:", error);
                    alert("An error occurred while adding food favorites.");
                }
                break;

            default:
                console.error("Invalid food data type:", typeof food);
                return;
        }

    
    
    };

export async function renderMostPopularFood() {

      if (!token) {
         window.location.href = "login.html";
         return;
      }

       try {
        // Fetch data from the API
        const response = await fetch(`${server_url}/meals/getRankingMeals`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
          }
          
      });
      // Replace with your actual API URL
        if (!response.ok) {
            throw new Error('Failed to fetch popular foods');
        }

        const popularFoods = await response.json(); // Assuming the API returns an array of food objects
        
        console.log("popularFoods", popularFoods);

        // Generate the slider content
        const sliderContent = popularFoods.slice(0, 5).map(food =>{
            // Encode food details as URL query parameters
            const queryParams = new URLSearchParams({
                name: food.name,
                category: food.category,
                imageUrl: food.imageUrl,
                price: food.price,
                preparationTime: food.preparationTime,
                general_rating: food.general_rating,
                description: food.description || 'Delicious dish' // Fallback description if API doesn't provide one
            }).toString(); 
            return `
            <div class="card rounded-4 border-0 shadow-sm osahan-card">
                <div class="card-body d-flex flex-column">
                    <span role="button" onclick="addRemove_to_favorites('${food._id}', ${food.isFavorite}, this)"
                    style="background-color: ${food.isFavorite ? '#e91e63' : '#878787'}; color: ${food.isFavorite ? '#fff' : '#fff'};
                    aria-disabled="${!food.isFavorite}"
                 tabindex="0" id="add_to_favorite" class="add-to-favorite material-symbols-outlined ms-auto">favorite</span>
                    <img class="img-fluid mb-3" src="${food.imageUrl}" alt="${food.name}">
                    <div class="d-flex">
                        <span class="badge rounded-pill bg-info-subtle pt-1 text-info">${food.category}</span>
                    </div>
                    <h5 class="mb-0 mt-2 fw-bold">${food.name}</h5>
                    <div class="d-flex gap-2 align-items-center mb-2">
                        <p class="text-secondary opacity-75 mb-0 miny-text">${food.preparationTime}min</p>
                        <p class="text-primary opacity-75 mb-0 miny-text"><span class="mdi mdi-star text-primary"></span> ${food.general_rating}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <h4 class="mb-0">€${food.price} <span class="text-secondary fs-6 mb-0 fw-normal text-decoration-line-through">€${food.price+Math.floor(Math.random() * (14 - 3 + 1)) + 3}</span></h4>
                        <a href="add-to-cart-2.html?${queryParams}" class="text-decoration-none bg-dark rounded-pill p-1 d-flex align-items-center justify-content-center ms-auto"><span class="material-symbols-outlined text-white">add</span></a>
                    </div>
                </div>
                <!-- <a href="add-to-cart-2.html?${queryParams}" class="stretched-link"></a> -->
            </div>
        `}).join('');

        // Return the slider HTML  <a href="add-to-cart-2.html" class="stretched-link"></a> 
        return `
            <div class="horizontal-slider" id="most-popular-food-slider">
                ${sliderContent}
            </div>
        `;
    } catch (error) {
        console.error('Error fetching popular foods:', error);
        return `<p class="text-danger">Failed to load popular foods. Please try again later.</p>`;
    }

}