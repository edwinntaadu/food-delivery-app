class Header {
    constructor(data, templateId, containerId) {
      this.data = data; 
      this.templateId = templateId;
      this.containerId = containerId;
      this.element = null;
    }
  
    render() {
      const template = document.getElementById(this.templateId).content;
      const container = document.getElementById(this.containerId);

      if (!template) throw new Error(`Template with ID ${this.templateId} not found`);
      if (!container) throw new Error(`Container with ID ${this.containerId} not found`);
  
      this.element = document.importNode(template, true);
  
      // Populate data
      this.element.querySelector(".location-title").textContent = this.data.locationTitle || "Location";
      this.element.querySelector(".location-subtitle").textContent = this.data.locationSubtitle || "";
      this.element.querySelector(".location-link").href = this.data.locationLink || "#";
      this.element.querySelector(".profile-img").src = this.data.profileImg || "img/user/1.jpeg";
      this.element.querySelector(".profile-link").href = this.data.profileLink || "profile.html";
      this.element.querySelector(".notification-link").href = this.data.notificationLink || "notification.html";
      this.element.querySelector(".search-input").value = this.data.searchValue || "";
  
      // Add event listeners
      this.addEventListeners();
  
      container.appendChild(this.element);
    }
  
    addEventListeners() {
      const searchInput = this.element.querySelector(".search-input");
      searchInput.addEventListener("input", () => {
        console.log(`Search query: ${searchInput.value}`);
        // Add search logic here 
      });
  
      // Reinitialize sidebar toggle 
      // const sidebarToggle = this.element.querySelector(".sidebar-toggle");
      // sidebarToggle.addEventListener("click", () => {
      //  console.log("Sidebar toggle clicked");
      //});
    }
  
    update(newData) {
      this.data = { ...this.data, ...newData };
      this.element.querySelector(".location-title").textContent = this.data.locationTitle;
      this.element.querySelector(".location-subtitle").textContent = this.data.locationSubtitle;
      this.element.querySelector(".location-link").href = this.data.locationLink;
      this.element.querySelector(".profile-img").src = this.data.profileImg;
      this.element.querySelector(".profile-link").href = this.data.profileLink;
      this.element.querySelector(".notification-link").href = this.data.notificationLink;
      this.element.querySelector(".search-input").value = this.data.searchValue;
    }
  }

  // Function to fetch template and render the Header component
function initHeader({ data, templateUrl = "components/header/header.html", templateId = "header-template", containerId = "header-container" }) {
    document.addEventListener("DOMContentLoaded", () => {
      fetch(templateUrl)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${templateUrl}: ${response.status}`);
          return response.text();
        })
        .then(html => {
          document.body.insertAdjacentHTML("beforeend", html);
          const header = new Header(data, templateId, containerId);
          header.render();
        })
        .catch(error => {
          console.error("Error loading header template:", error);
        });
    });
  } 

  // Default header data
const defaultHeaderData = {
    locationTitle: "Location",
    locationSubtitle: "California, USA",
    locationLink: "add-to-address.html",
    profileImg: "img/user/1.jpeg",
    profileLink: "profile.html",
    notificationLink: "notification.html",
    searchValue: ""
  };

  // Automatically initialize header with default or custom data
(function () {
    // Check for custom data provided by the page 
    const headerData = window.headerData || defaultHeaderData;
    initHeader({ data: headerData });
  })();

  // Export for use in other scripts (optional, depending on module system)
  // if (typeof module !== "undefined" && module.exports) {
  //  module.exports = { Header, initHeader };
  //} else {
  //  window.initHeader = initHeader; // Make initHeader globally available for non-module environments
  //}