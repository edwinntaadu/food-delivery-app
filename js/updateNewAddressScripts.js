import config from './store/config.js';

(function ($) {
    "use strict"; // Start of use strict

    // Sidebar
    var $main_nav = $('#main-nav');
    var $toggle = $('.toggle');

    var defaultOptions = {
        disableAt: false,
        customToggle: $toggle,
        levelSpacing: 40,
        navTitle: '',
        levelTitles: true,
        levelTitleAsBack: true,
        pushContent: '#container',
        insertClose: 2
    };
    var Nav = $main_nav.hcOffcanvasNav(defaultOptions);

})(jQuery);

let server_url = config.API_URL;

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("loggedIn_userToken");

    if (!token) {
        alert("You are not logged in. Please log in first.");
        window.location.href = "login.html";
        return;
    }

    const addressFields = {
        street: document.getElementById("address_street"),
        city: document.getElementById("address_city"),
        state: document.getElementById("address_state"),
        zip: document.getElementById("address_zip"),
    };

    let originalAddress = {}; // Save a copy of the original address for comparison

    // Fetch user profile information
    try {
        const response = await fetch(`${server_url}/profile/getProfileInformation`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.message || "Failed to fetch user profile.");
            return;
        }

        const result = await response.json();
        console.log("Fetched Profile:", result);

        // Check if address exists and populate the fields
        const address = result.profile.address || {};
        addressFields.street.value = address.street || "";
        addressFields.city.value = address.city || "";
        addressFields.state.value = address.state || "";
        addressFields.zip.value = address.zip || "";

        // Save a copy of the original address for comparison
        originalAddress = { ...address };

    } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("An error occurred while fetching the user profile.");
    }

    // Save changes when the "Save Changes" button is clicked
    document.getElementById("save_changes_button").addEventListener("click", async () => {
        const updatedAddress = {};

        // Check for changes in the address fields
        for (const [key, field] of Object.entries(addressFields)) {
            if (field.value !== originalAddress[key]) {
                updatedAddress[key] = field.value;
            }
        }

        // If no changes were made, do nothing
        if (Object.keys(updatedAddress).length === 0) {
            alert("No changes were made.");
            return;
        }

        // Send updated address to the backend
        try {
            const response = await fetch(`${server_url}/profile/updateProfileInformation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ address: updatedAddress }),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message || "Failed to update profile address.");
                return;
            }

            const result = await response.json();
            console.log("Updated Profile:", result);
            alert("Profile address updated successfully!");

            // Update the original address with the new values
            originalAddress = { ...originalAddress, ...updatedAddress };
        } catch (error) {
            console.error("Error updating profile address:", error);
            alert("An error occurred while updating the profile address.");
        }
    });
});