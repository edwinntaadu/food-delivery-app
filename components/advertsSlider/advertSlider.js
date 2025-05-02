export function renderSlider() {
    return `
        <div id="carouselExampleDark" class="carousel carousel-dark slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="pb-5">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                        <div class="bg-primary text-white rounded-4 p-4 food-book-back position-relative shadow overflow-hidden shadow">
                            <h2 class="fw-bold mb-1">Limited</h2>
                            <h5 class="mb-1 doctor-book-back-title">Time Offer!</h5>
                            <p class="mb-3 text-white-50 small">Get 20% Off Your Order</p>
                            <a href="food-search.html" class="btn btn-sm btn-book btn-dark rounded-pill small">ORDER NOW <i class="bi bi-arrow-right"></i></a>
                            <div class="food-shop-img">
                                <img src="img/banner1.png" alt="" class="img-fluid">
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                        <div class="bg-white text-white rounded-4 p-4 food-book-back position-relative shadow overflow-hidden shadow">
                            <h2 class="fw-bold text-primary mb-1">Buy One,</h2>
                            <h5 class="mb-1 doctor-book-back-title text-black">Get One Free!</h5>
                            <p class="mb-3 text-muted small">Double the Deliciousness</p>
                            <a href="food-search.html" class="btn btn-sm btn-book btn-primary rounded-pill small">ORDER NOW <i class="bi bi-arrow-right"></i></a>
                            <div class="food-shop-img">
                                <img src="img/banner2.png" alt="" class="img-fluid">
                            </div>
                        </div>         
                    </div>
                    <div class="carousel-item">
                        <div class="bg-primary text-white rounded-4 p-4 food-book-back position-relative shadow overflow-hidden shadow">
                            <h2 class="fw-bold mb-1">Limited</h2>
                            <h5 class="mb-1 doctor-book-back-title">Time Offer!</h5>
                            <p class="mb-3 text-white-50 small">Get 20% Off Your Order</p>
                            <a href="food-search.html" class="btn btn-sm btn-book btn-dark rounded-pill small">ORDER NOW <i class="bi bi-arrow-right"></i></a>
                            <div class="food-shop-img">
                                <img src="img/banner1.png" alt="" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}