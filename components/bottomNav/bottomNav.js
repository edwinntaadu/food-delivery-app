import config from '../../js/store/config.js';

export function renderBottomNav() {
   // Get current page from URL (e.g., home.html, like.html, etc.)
  const currentPage = window.location.pathname.split('/').pop();

  // Helper to set active class and icon color
  const navItems = [
    { href: "home.html", icon: "home", label: "Home" },
    { href: "like.html", icon: "favorite", label: "Like" },
    { href: "chat.html", icon: "shopping_bag", label: "Cart" },
    { href: "notification.html", icon: "notifications", label: "Notifications" },
    { href: "account-information.html", icon: "person", label: "Account" },
  ];

  return `
    <div class="osahan-page-footer mt-auto p-3">
      <div class="d-flex justify-content-between align-items-center bg-white shadow rounded-pill px-3">
        ${navItems.map(item => `
          <div class="text-center lh-1 col">
            <a class="p-3 d-block${currentPage === item.href ? ' active' : ''}" href="${item.href}">
              <span class="material-symbols-outlined${currentPage === item.href ? ' text-primary' : ' text-secondary'}">
                ${item.icon}
              </span>
            </a>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}



