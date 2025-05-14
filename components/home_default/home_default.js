import config from '../../js/store/config.js';
import { renderSlider } from '../advertsSlider/advertSlider.js';

export function renderHomeDefault() {
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
                     <span class="mdi mdi-pizza fs-4 bg-danger text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-danger my-1">Pizza</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-noodles fs-4 bg-success text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-success my-1">Asian</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-ice-cream fs-4 bg-warning text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-warning my-1">Ice</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-bread-slice fs-4 bg-info text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-info my-1">Bread</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
               <div class="col">
                  <div class="bg-white shadow-sm rounded-4 text-center p-2 position-relative">
                     <span class="mdi mdi-cake fs-4 bg-dark text-white rounded-pill mt-1"></span>
                     <p class="small m-0 text-dark my-1">Cake</p>
                     <a href="like.html" class="stretched-link"></a>
                  </div>
               </div>
             </div>

            <h6 class="mb-3 mt-4 fw-bold">Most Popular</h6>
            <div class="d-flex gap-3 mb-3">
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
               <div>
                  <div class="card rounded-4 border-0 shadow-sm osahan-card">
                     <div class="card-body d-flex flex-column">
                        <span class="material-symbols-outlined ms-auto">favorite</span>
                        <img class="img-fluid mb-3" src="img/list/2.jpeg">
                        <div class="d-flex">
                           <span class="badge rounded-pill bg-danger-subtle text-danger pt-1">Tranding</span>
                        </div>
                        <h5 class="mb-0 mt-2 fw-bold">Swe Dish</h5>
                        <div class="d-flex gap-2 align-items-center mb-2">
                           <p class="text-secondary opacity-75 mb-0 miny-text">34min</p>
                           <p class="text-primary opacity-75 mb-0 miny-text"><span class="mdi mdi-star text-primary"></span> 4.9</p>
                        </div>
                        <div class="d-flex align-items-center">
                           <h4 class="mb-0">$19 <span class="text-secondary fs-6 mb-0 fw-normal text-decoration-line-through">$99</span></h4>
                           <a href="add-to-cart.html" class="text-decoration-none bg-dark rounded-pill p-1 d-flex align-items-center justify-content-center ms-auto"><span class="material-symbols-outlined text-white">add</span></a>
                        </div>
                     </div>
                     <a href="add-to-cart-2.html" class="stretched-link"></a>
                  </div>
               </div>
            </div>
            <h6 class="mb-3 mt-4 fw-bold">Nearby Resturents</h6>
            <div class="card mb-0 rounded-4 border-0 shadow overflow-hidden osahan-card-2">
               <img src="img/list/6.jpeg" class="card-img-top img-fluid">
               <div class="card-body">
                  <div class="d-flex">
                     <span class="badge rounded-pill bg-info-subtle pt-1 text-info">Healthy</span>
                  </div>
                  <h5 class="mb-0 h6 fw-bold pt-1">Chicken Hell</h5>
                  <div class="d-flex gap-2 align-items-center">
                     <p class="text-secondary opacity-75 mb-0">24min</p>
                     <p class="text-primary opacity-75 mb-0"><span class="mdi mdi-star text-primary"></span> 4.8</p>
                     <div class="bg-primary d-flex align-items-center rounded-circle justify-content-center p-1 ms-auto">
                        <span class="material-symbols-outlined text-white">bookmark</span>
                     </div>
                  </div>
               </div>
               <a href="add-to-cart-2.html" class="stretched-link"></a>
            </div>
    </div>
  `;
}

let server_url = config.API_URL;


