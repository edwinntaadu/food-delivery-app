import config from '../../js/store/config.js';

export function renderBottomNav() {
  return `
    <div class="osahan-page-footer mt-auto p-3">
            <div class="d-flex justify-content-between align-items-center bg-white shadow rounded-pill px-3">
               <div class="text-center lh-1 col">
                  <a class="p-3 d-block" href="home.html"><span class="material-symbols-outlined text-primary">home</span></a>
               </div>
               <div class="text-center lh-1 col">
                  <a class="p-3 d-block" href="like.html"><span class="material-symbols-outlined text-secondary">favorite</span></a>
               </div>
               <div class="text-center lh-1 col">
                  <a class="p-3 d-block" href="chat.html"><span class="material-symbols-outlined text-secondary">shopping_bag</span></a>
               </div>
               <div class="text-center lh-1 col">
                  <a class="p-3 d-block" href="notification.html"><span class="material-symbols-outlined text-secondary">notifications</span></a>
               </div>
               <div class="text-center lh-1 col">
                  <a class="p-3 d-block" href="account-information.html"><span class="material-symbols-outlined text-secondary">person</span></a>
               </div>
            </div>
         </div>
  `;
}



