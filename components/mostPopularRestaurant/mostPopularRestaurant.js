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
                     <div class="bg-primary d-flex align-items-center rounded-circle justify-content-center p-1 ms-auto">
                        <span class="material-symbols-outlined text-white">bookmark</span>
                     </div>
                  </div>
               </div>
               <a href="seller-details.html?sellerId=${seller._id}" class="stretched-link"></a>
            </div>
        `).join('');

        // Return the slider HTML
        return `
            <div class="horizontal-slider">
                ${sliderContent}
            </div>
        `;
    } catch (error) {
        console.error('Error fetching popular restaurants:', error);
        return `<p class="text-danger">Failed to load popular restaurants. Please try again later.</p>`;
    }

}