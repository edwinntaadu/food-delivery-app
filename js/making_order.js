const urlParams = new URLSearchParams(window.location.search);
         const foodData = {
            category: urlParams.get('category') || 'Healthy',
            name: urlParams.get('name') || 'Chicken Hell',
            description: urlParams.get('description') || 'Best Chicken Ever',
            imageUrl: urlParams.get('imageUrl') || 'img/list/6.jpeg',
            price: urlParams.get('price') || '10.99',
            preparationTime: urlParams.get('preparationTime') || '30',
            general_rating: urlParams.get('general_rating') || '4.5'
         };

         // Update DOM elements with food data
         document.querySelector('.category-badge').textContent = foodData.category;
         document.querySelector('.food-name').textContent = foodData.name;
         document.querySelector('.food-description').textContent = foodData.description;
         document.querySelector('.food-image').src = foodData.imageUrl;
         const priceParts = foodData.price.split('.');
         document.querySelector('.food-price').textContent = `$${priceParts[0]}`;
         document.querySelector('.food-price-cents').textContent = priceParts[1] ? `.${priceParts[1]}` : '.99';

         // Initialize cart count display
         function updateCartCount() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            document.querySelector('.cart-count').textContent = cartCount;
         }

         // Add to cart function
         function addToCart() {
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            const selectedSize = document.querySelector('.btn-check:checked + label')?.textContent || 'M';
            const newItem = {
               name: foodData.name,
               price: parseFloat(foodData.price),
               imageUrl: foodData.imageUrl,
               quantity: 1,
               size: selectedSize,
               id: `${foodData.name}-${selectedSize}-${Date.now()}` // Unique ID for each item
            };
            console.log('Adding to cart:', newItem);

            // Check if item with same name and size exists
            const existingItemIndex = cartItems.findIndex(
               item => item.name === newItem.name && item.size === newItem.size
            );
            if (existingItemIndex >= 0) {
               cartItems[existingItemIndex].quantity += 1;
            } else {
               cartItems.push(newItem);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            // window.location.href = 'review-payment.html';
         }

         // Attach event listener to Add To Cart button
         document.querySelector('.add-to-cart-btn').addEventListener('click', (event) => {
            event.preventDefault();
            addToCart();
         });

         // Initialize cart count on page load
         updateCartCount();
