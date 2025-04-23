

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
          <div class="bg-primary d-flex align-items-center rounded-circle justify-content-center p-1 ms-auto">
              <span class="material-symbols-outlined text-white">bookmark</span>
          </div>
        </div>
      </div>
      <a href="add-to-cart-2.html" class="stretched-link"></a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function () {
    const baseURL = 'http://localhost:4000';
  
    const searchInput = document.getElementById('searchInput'); // search.html
    const homeSearchInput = document.getElementById('homeSearchInput'); // home.html
  
    const foodContainer =
      document.querySelector('#searchFoodResults') || document.querySelector('#popularFoods');
    const restaurantContainer =
      document.querySelector('#searchRestaurantResults') || document.querySelector('#nearbyRestaurants');

  // Debounce function
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), timeout);
    };
  }

  // API Fetch function
  async function fetchData(searchTerm, type) {
    try {
      const endpoint = type === 'food' ? '/api/foods' : '/api/restaurants';
      const response = await fetch(`${baseURL}${endpoint}?search=${encodeURIComponent(searchTerm)}`, {
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      showErrorToast('Failed to fetch data. Please try again.');
      return [];
    }
  }

  // Render functions
  function renderFoodItems(items, container) {
    container.innerHTML =
      items.length > 0
        ? items.map((item) => `<div class="col">${createFoodCard(item)}</div>`).join('')
        : '<div class="text-center py-4">No food items found</div>';
  }

  function renderRestaurants(items, container) {
    container.innerHTML =
      items.length > 0
        ? items.map((restaurant) => createRestaurantCard(restaurant)).join('')
        : '<div class="text-center py-4">No restaurants found</div>';
  }

  // Search results handler
  const updateResults = debounce(async () => {
    const searchTerm = searchInput?.value || '';
    const activeTab = document.querySelector('.nav-link.active')?.id;
    const type = activeTab === 'pills-home-tab' ? 'food' : 'restaurant';
    const container =
      activeTab === 'pills-home-tab'
        ? document.querySelector('#searchFoodResults')
        : document.querySelector('#searchRestaurantResults');

    if (!container) return;

    container.innerHTML = '<div class="text-center py-4">Searching...</div>';

    try {
      const data = await fetchData(searchTerm, type);
      const renderFunction = type === 'food' ? renderFoodItems : renderRestaurants;
      renderFunction(data, container);
    } catch (error) {
      container.innerHTML = '<div class="text-center py-4 text-danger">Error loading results</div>';
    }
  });

  // Initialization
  async function initializePage() {
    try {
      const [foods, restaurants] = await Promise.all([
        fetchData('', 'food'),
        fetchData('', 'restaurant'),
      ]);

      if (foodContainer) renderFoodItems(foods, foodContainer);
      if (restaurantContainer) renderRestaurants(restaurants, restaurantContainer);
    } catch (error) {
      console.error('Initialization error:', error);
      showErrorToast('Failed to load initial data');
    }
  }

  // Run initial load
  initializePage();

  // Setup listeners if searchInput exists (search.html)
  if (searchInput) {
    const tabs = document.querySelectorAll('.nav-link');
    searchInput.addEventListener('input', updateResults);
    tabs.forEach((tab) => tab.addEventListener('shown.bs.tab', updateResults));
  }

  // Setup listener if homeSearchInput exists (home.html)
  if (homeSearchInput) {
    homeSearchInput.addEventListener(
      'input',
      debounce(async () => {
        const searchTerm = homeSearchInput.value;
        const [foods, restaurants] = await Promise.all([
          fetchData(searchTerm, 'food'),
          fetchData(searchTerm, 'restaurant'),
        ]);

        renderFoodItems(foods, document.querySelector('#popularFoods'));
        renderRestaurants(restaurants, document.querySelector('#nearbyRestaurants'));
      }, 300)
    );
  }
});

// Utility functions
function showErrorToast(message) {
  // Implement toast notifications here
  console.error('Error:', message);
}