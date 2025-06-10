import config from '../../js/store/config.js';

export async function renderMostPopularRestaurant() {

      let server_url = config.API_URL
      const token = localStorage.getItem("loggedIn_userToken");

      const user = localStorage.getItem("userProfile");
      console.log(user.email)

      const request_city = "Berlin"; // Replace with the actual city value
      const request_area_code = "12689"; // Replace with the actual area code value

      if (!token) {
         window.location.href = "login.html";
         return;
      }

       try {
        // Fetch data from the API
        const response = await fetch(`${server_url}/sellers/getRankingSellers?request_city=${encodeURIComponent(request_city)}&request_area_code=${encodeURIComponent(request_area_code)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        // Replace with your actual API URL
        if (!response.ok) {
            throw new Error('Failed to fetch popular foods');
        }

        const mostPopularRestaurant = await response.json(); // Assuming the API returns an array of food objects

        window.addRemove_to_bookmark = async function(restID, isBooked, el) {
        
                if (!el) return; // Safety check
            
                switch (isBooked) {
                    case true:
                        try {
                            const response = await fetch(`${server_url}/restBookmark/remove`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                },
                                body: JSON.stringify({ "restaurantId": restID })
                            });
        
                                
                            if (!response.ok) {
                                const error = await response.json(); // Read the response body only once
                                alert(error.message || "Failed to remove Restaurant from bookmark.");
                                return;
                            }
                        
                            const result = await response.json(); // Read the response body only once
        
                             // Update style immediately
       
                            const container = document.getElementById('most-popular-restaurant-slider')?.parentNode;
                            if (container) {
                                container.innerHTML = await renderMostPopularRestaurant();
                            } 
                            
                        } catch (error) {
                            console.error("Error removing from bookmarks:", error);
                            alert("An error occurred while removing restaurant from bookmarks.");
                        }
                        break;
                    case false:
                        try {
                            const response = await fetch(`${server_url}/restBookmark/add`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${token}`,
                                },
                                body: JSON.stringify({ "restaurantId": restID })
                            });
        
                                
                            if (!response.ok) {
                                const error = await response.json(); // Read the response body only once
                                alert(error.message || "Failed to add restaurant to bookmarks.");
                                return;
                            }
                        
                            const result = await response.json(); // Read the response body only once
        
                            // Update style immediately
                           const container = document.getElementById('most-popular-restaurant-slider')?.parentNode;
                            if (container) {
                                container.innerHTML = await renderMostPopularRestaurant();
                            } 
        
                        } catch (error) {
                            console.error("Error adding to bookmarks:", error);
                            alert("An error occurred while adding restaurant to bookmarks.");
                        }
                        break;
        
                    default:
                        console.error("Invalid restaurant data type:", typeof restID);
                        return;
                }
        
            
            
            };
    
        // Generate the slider content
        const sliderContent = mostPopularRestaurant.slice(0, 5).map(seller => `
            <div class="card mb-0 rounded-4 border-0 shadow overflow-hidden osahan-card-2">
               <img src="${seller.imageUrl || 'img/default-restaurant.jpg'}" class="card-img-top img-fluid" alt="${seller.name}">
               <div class="card-body">
                  <div class="d-flex">
                     <span class="badge rounded-pill bg-info-subtle pt-1 text-info">${seller.sellerType}</span>
                  </div>
                    <h5 class="mb-0 h6 fw-bold pt-1">${seller.name}</h5>
                    <p class="text-secondary opacity-75 mb-0">${seller.address.city}, ${seller.address.state}</p>
                  <div class="d-flex gap-2 align-items-center">
                     
                        <p class="text-secondary opacity-75 mb-0">${seller.phone}</p>
                        <p class="text-primary opacity-75 mb-0"><span class="mdi mdi-star text-primary"></span> ${seller.general_rating}</p>                
                     <div role="button"
                        class="d-flex align-items-center rounded-circle justify-content-center p-1 ms-auto"
                        style="background-color: ${seller.isBookmarked ? '#800000' : '#878787'};">
                        <span id="add_to_bookmarks" class="material-symbols-outlined text-white"
                            onclick="addRemove_to_bookmark('${seller._id}', ${seller.isBookmarked}, this)"
                            aria-disabled="${!seller.isBookmarked}"
                            tabindex="0">bookmark</span>
                    </div>
                  </div>
                  
               </div>
               
            </div>
        `).join('');

        // Return the slider HTML
        return `
            <div class="horizontal-slider" id="most-popular-restaurant-slider">
                ${sliderContent}
            </div>
        `;
    } catch (error) {
        console.error('Error fetching popular restaurants:', error);
        return `<p class="text-danger">Failed to load popular restaurants. Please try again later.</p>`;
    }

}