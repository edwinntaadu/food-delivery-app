import config from '../../js/store/config.js';
import { renderSlider } from '../advertsSlider/advertSlider.js';
import {renderMostPopularFood} from '../mostPopularFood/mostPopularFood.js';
import {renderMostPopularRestaurant} from '../mostPopularRestaurant/mostPopularRestaurant.js';

export async function renderHomeDefault() {

   const mostPopularFoodHTML = await renderMostPopularFood();
   
   const mostPopularRestaurantHTML = await renderMostPopularRestaurant();

  return `
    <div>
        <!-- slider -->
        <div id="slider-container">
            ${renderSlider()} <!-- Include the slider content here -->
        </div>
        <!-- slider-end -->
            <div class="row g-2 ingrediants-box">
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-tea fs-4 bg-danger text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-danger my-1">Breakfast</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-pasta fs-4 bg-success text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-success my-1">Lunch</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-rice fs-4 bg-warning text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-warning my-1">Supper</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-baguette fs-4 bg-info text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-info my-1">Pastry</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-silverware-clean fs-4 bg-dark text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-dark my-1">Special</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
             </div>

            <h6 class="mb-3 mt-4 fw-bold">Most Popular</h6>
            <div class="demo-slider">
               ${mostPopularFoodHTML} <!-- Include the most popular food cards here -->
               </div>
            </div>
            <!-- Restaurants Start here !-->
            <h6 class="mb-3 mt-4 fw-bold">Nearby Resturents</h6>
            <div class="demo-slider">
               ${mostPopularRestaurantHTML} <!-- Include the most popular restaurants cards here -->
            </div>
    </div>
  `;
}

let server_url = config.API_URL;


