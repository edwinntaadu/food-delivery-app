/*
Template Name: Foodx | Food Mobile PWA HTML Template
Author: Pillarix
Author URI: https://wrapbootstrap.com/user/pillarix
Version: 0.1
*/

/*
- Sidebar
*/

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
