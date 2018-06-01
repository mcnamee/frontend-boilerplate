// Imports / Plugins / Dependencies
// ------------------------------------------------------

import 'bootstrap';
window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');

// Custom
// ------------------------------------------------------

/**
 * Popovers
 */
$(function () {
  $('[data-toggle="popover"]').popover();
})

/**
 * Tooltips
 */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
