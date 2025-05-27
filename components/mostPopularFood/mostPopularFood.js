import config from '../../js/store/config.js';

export async function renderMostPopularFood() {

      let server_url = config.API_URL
      const token = localStorage.getItem("loggedIn_userToken");

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
          },
      });
      // Replace with your actual API URL
        if (!response.ok) {
            throw new Error('Failed to fetch popular foods');
        }

        const popularFoods = await response.json(); // Assuming the API returns an array of food objects

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
                    <span class="material-symbols-outlined ms-auto">favorite</span>
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

        // Return the slider HTML
        return `
            <div class="horizontal-slider">
                ${sliderContent}
            </div>
        `;
    } catch (error) {
        console.error('Error fetching popular foods:', error);
        return `<p class="text-danger">Failed to load popular foods. Please try again later.</p>`;
    }
 /*    return `
        <div>
                  <div class="card rounded-4 border-0 shadow-sm osahan-card">
                     <div class="card-body d-flex flex-column">
                        <span class="material-symbols-outlined ms-auto">favorite</span>
                        <img class="img-fluid mb-3" src="img/list/1.jpeg">
                        <div class="d-flex">
                           <span class="badge rounded-pill bg-info-subtle pt-1 text-info">Healthy</span>
                        </div>
                        <h5 class="mb-0 mt-2 fw-bold">Chicken Hell</h5>
                        <div class="d-flex gap-2 align-items-center mb-2">
                           <p class="text-secondary opacity-75 mb-0 miny-text">24min</p>
                           <p class="text-primary opacity-75 mb-0 miny-text"><span class="mdi mdi-star text-primary"></span> 4.8</p>
                        </div>
                        <div class="d-flex align-items-center">
                           <h4 class="mb-0">$12 <span class="text-secondary fs-6 mb-0 fw-normal text-decoration-line-through">$99</span></h4>
                           <a href="add-to-cart.html" class="text-decoration-none bg-dark rounded-pill p-1 d-flex align-items-center justify-content-center ms-auto"><span class="material-symbols-outlined text-white">add</span></a>
                        </div>
                     </div>
                     <a href="add-to-cart-2.html" class="stretched-link"></a>
                  </div>
               </div>
    `; */
}